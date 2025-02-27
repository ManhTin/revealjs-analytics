import { prisma } from "@/lib/prisma";
import type {
  ExitData,
  LinkClickData,
  MediaData,
  PresentationViews,
  QuizData,
  SlideData,
  StartData,
} from "@/types/analytics";

export class AnalyticsRepository {
  async getPresentationViews(
    presentationId: string,
    dateFrom?: Date,
    dateTo?: Date,
  ): Promise<PresentationViews> {
    // Get total views count
    const viewEvents = await prisma.logPresentationClose.groupBy({
      by: ["presentationId"],
      where: {
        presentationId,
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      _sum: {
        totalDwellTime: true,
      },
      _avg: {
        totalDwellTime: true,
      },
    });

    return {
      totalViews: viewEvents[0]?._count.id || 0,
      sumDwellTime: viewEvents[0]?._sum.totalDwellTime || 0,
      avgDwellTime: viewEvents[0]?._avg.totalDwellTime || 0,
    };
  }

  async getSlideAnalytics(
    presentationId: string,
    dateFrom?: Date,
    dateTo?: Date,
  ): Promise<SlideData[]> {
    // Group slide views by slideNumber and get counts and time spent
    const slideViews = await prisma.logSlideView.groupBy({
      by: ["slideNumber"],
      where: {
        presentationId,
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      _sum: {
        dwellTime: true,
      },
      orderBy: {
        slideNumber: "asc",
      },
    });

    return slideViews.map((item) => ({
      slide: item.slideNumber,
      views: item._count.id,
      timeSpent: item._sum.dwellTime || 0,
    }));
  }

  async getExitPoints(presentationId: string, dateFrom?: Date, dateTo?: Date): Promise<ExitData[]> {
    const exitPoints = await prisma.logPresentationClose.groupBy({
      by: ["slideNumber"],
      where: {
        presentationId,
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    return exitPoints.map((item) => ({
      slide: item.slideNumber,
      count: item._count.id,
    }));
  }

  async getStartPoints(
    presentationId: string,
    dateFrom?: Date,
    dateTo?: Date,
  ): Promise<StartData[]> {
    const startPoints = await prisma.logPresentationStart.groupBy({
      by: ["slideNumber"],
      where: {
        presentationId,
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    return startPoints.map((item) => ({
      slide: item.slideNumber,
      count: item._count.id,
    }));
  }

  async getQuizAnalytics(
    presentationId: string,
    dateFrom?: Date,
    dateTo?: Date,
  ): Promise<QuizData[]> {
    // Get all quiz actions
    const quizCompletedActions = await prisma.logQuizAction.groupBy({
      by: ["quizName"],
      where: {
        presentationId,
        actionType: "COMPLETE",
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      _avg: {
        score: true,
      },
    });

    return quizCompletedActions.map((item) => ({
      title: item.quizName,
      averageScore: item._avg.score || 0,
      totalParticipants: item._count.id || 0,
    }));
  }

  async getMediaEngagement(
    presentationId: string,
    dateFrom?: Date,
    dateTo?: Date,
  ): Promise<MediaData[]> {
    // Get media started count (PLAY events)
    const mediaActions = await prisma.logMediaAction.groupBy({
      by: ["mediaSource"],
      where: {
        presentationId,
        actionType: "PAUSE",
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      _avg: {
        progress: true,
      },
    });

    return mediaActions.map((item) => ({
      source: item.mediaSource.split("/").pop() || item.mediaSource,
      playCount: item._count.id || 0,
      avgProgress: item._avg.progress || 0,
    }));
  }

  async getLinkClicks(
    presentationId: string,
    dateFrom?: Date,
    dateTo?: Date,
  ): Promise<LinkClickData[]> {
    // Group link clicks by URL
    const linkClicks = await prisma.logLinkAction.groupBy({
      by: ["linkUrl"],
      where: {
        presentationId,
        ...(dateFrom &&
          dateTo && {
            timestamp: {
              gte: dateFrom,
              lte: dateTo,
            },
          }),
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    return linkClicks.map((item) => ({
      href: item.linkUrl,
      clicks: item._count.id,
    }));
  }
}
