import type {
  LinkType,
  LogLinkAction,
  LogMediaAction,
  LogPresentationClose,
  LogPresentationStart,
  LogQuizAction,
  LogSlideView,
  MediaActionType,
  MediaType,
  QuizActionType,
} from "@prisma/client";

export interface LogEventsDto {
  logPresentationStartEvents: Omit<LogPresentationStart, "id">[];
  logPresentationCloseEvents: Omit<LogPresentationClose, "id">[];
  logSlideViewEvents: Omit<LogSlideView, "id">[];
  logLinkActionEvents: Omit<LogLinkAction, "id">[];
  logMediaActionEvents: Omit<LogMediaAction, "id">[];
  logQuizActionEvents: Omit<LogQuizAction, "id">[];
}

export interface ProcessedEvents {
  logPresentationStartEvents: Omit<LogPresentationStart, "id">[];
  logPresentationCloseEvents: Omit<LogPresentationClose, "id">[];
  logSlideViewEvents: Omit<LogSlideView, "id">[];
  logLinkActionEvents: Omit<LogLinkAction, "id">[];
  logMediaActionEvents: Omit<LogMediaAction, "id">[];
  logQuizActionEvents: Omit<LogQuizAction, "id">[];
}

export class EventProcessingService {
  processEvents(events: LogEventsDto): ProcessedEvents {
    return {
      logPresentationStartEvents: events.logPresentationStartEvents,
      logPresentationCloseEvents: events.logPresentationCloseEvents,
      logSlideViewEvents: events.logSlideViewEvents,
      logLinkActionEvents: this.processLinkActionEvents(events.logLinkActionEvents),
      logMediaActionEvents: this.processMediaActionEvents(events.logMediaActionEvents),
      logQuizActionEvents: this.processQuizActionEvents(events.logQuizActionEvents),
    };
  }

  private processMediaActionEvents(events: Omit<LogMediaAction, "id">[]) {
    return events.map((event) => ({
      ...event,
      mediaType: event.mediaType as unknown as MediaType,
      actionType: event.actionType as unknown as MediaActionType,
    }));
  }

  private processQuizActionEvents(events: Omit<LogQuizAction, "id">[]) {
    return events.map((event) => ({
      ...event,
      actionType: event.actionType as unknown as QuizActionType,
    }));
  }

  private processLinkActionEvents(events: Omit<LogLinkAction, "id">[]) {
    return events.map((event) => ({
      ...event,
      linkType: event.linkType as unknown as LinkType,
    }));
  }
}
