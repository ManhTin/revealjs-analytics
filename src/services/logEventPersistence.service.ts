import type { LogEventRepository } from "@/repositories/logEvent.repository";
import type { ProcessedLogEvents } from "./logEventProcessing.service";

export class LogEventPersistenceService {
  constructor(private readonly logEventRepository: LogEventRepository) {}

  async call(logEvents: ProcessedLogEvents) {
    try {
      const logPresentationStart = await this.logEventRepository.savePresentationStartEvents(
        logEvents.logPresentationStartEvents,
      );

      const logPresentationClose = await this.logEventRepository.savePresentationCloseEvents(
        logEvents.logPresentationCloseEvents,
      );

      const logSlideView = await this.logEventRepository.saveSlideViewEvents(
        logEvents.logSlideViewEvents,
      );

      const logLinkAction = await this.logEventRepository.saveLinkActionEvents(
        logEvents.logLinkActionEvents,
      );

      const logMediaAction = await this.logEventRepository.saveMediaActionEvents(
        logEvents.logMediaActionEvents,
      );

      const logQuizAction = await this.logEventRepository.saveQuizActionEvents(
        logEvents.logQuizActionEvents,
      );

      return {
        logPresentationStart,
        logPresentationClose,
        logSlideView,
        logLinkAction,
        logMediaAction,
        logQuizAction,
      };
    } catch (error) {
      console.error("Error persisting events:", error);
      return null;
    }
  }
}
