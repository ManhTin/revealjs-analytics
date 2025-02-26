import type { EventRepository } from "@/repositories/eventRepository";
import type { ProcessedEvents } from "./eventProcessingService";

export class EventPersistenceService {
  constructor(private readonly eventRepository: EventRepository) {}

  async persistEvents(events: ProcessedEvents) {
    try {
      const logPresentationView = await this.eventRepository.savePresentationViewEvents(
        events.logPresentationViewEvents,
      );

      const logSlideView = await this.eventRepository.saveSlideViewEvents(
        events.logSlideViewEvents,
      );

      const logLinkAction = await this.eventRepository.saveLinkActionEvents(
        events.logLinkActionEvents,
      );

      const logMediaAction = await this.eventRepository.saveMediaActionEvents(
        events.logMediaActionEvents,
      );

      const logQuizAction = await this.eventRepository.saveQuizActionEvents(
        events.logQuizActionEvents,
      );

      return {
        logPresentationView,
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
