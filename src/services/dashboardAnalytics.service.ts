import type { AnalyticsRepository, PresentationRepository } from "@/repositories";
import type { DateRange } from "@/types/analytics";

export class DashboardAnalyticsService {
  constructor(
    private readonly analyticsRepository: AnalyticsRepository,
    private readonly presentationRepository: PresentationRepository,
  ) {}

  async call(userId: string, dateRange?: DateRange) {
    const dateFrom = dateRange?.from;
    const dateTo = dateRange?.to;

    const [views, viewsByDate, recentActivePresentationsIds] = await Promise.all([
      this.analyticsRepository.getAllPresentationViews(userId, dateFrom, dateTo),
      this.analyticsRepository.getPresentationAnalyticsByDay(userId, dateFrom, dateTo),
      this.analyticsRepository.getPresentationsWithLatestViews(userId),
    ]);

    const recentActivePresentations = await this.presentationRepository.getPresentationsInfo(
      userId,
      recentActivePresentationsIds.map((p) => p.presentationId),
    );

    return {
      views,
      viewsByDate,
      recentActivePresentations,
    };
  }
}
