import { AnalyticsRepository } from "@/repositories";
import type { DateRange, PresentationAnalytics } from "@/types/analytics";

export class PresentationAnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async call(presentationId: string, dateRange?: DateRange): Promise<PresentationAnalytics> {
    const dateFrom = dateRange?.from;
    const dateTo = dateRange?.to;

    // Get all the analytics data for a presentation
    const [views, slideData, exitData, startData, quizData, mediaData, linkClicks] =
      await Promise.all([
        this.analyticsRepository.getPresentationViews(presentationId, dateFrom, dateTo),
        this.analyticsRepository.getSlideAnalytics(presentationId, dateFrom, dateTo),
        this.analyticsRepository.getExitPoints(presentationId, dateFrom, dateTo),
        this.analyticsRepository.getStartPoints(presentationId, dateFrom, dateTo),
        this.analyticsRepository.getQuizAnalytics(presentationId, dateFrom, dateTo),
        this.analyticsRepository.getMediaEngagement(presentationId, dateFrom, dateTo),
        this.analyticsRepository.getLinkClicks(presentationId, dateFrom, dateTo),
      ]);

    return {
      views,
      slideData,
      exitData,
      startData,
      quizData,
      mediaData,
      linkClicks,
    };
  }
}

export const presentationAnalyticsService = new PresentationAnalyticsService(
  new AnalyticsRepository(),
);
