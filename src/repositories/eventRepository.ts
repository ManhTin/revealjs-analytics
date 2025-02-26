import { prisma } from "@/lib/prisma";
import type {
  LogLinkAction,
  LogMediaAction,
  LogPresentationView,
  LogQuizAction,
  LogSlideView,
} from "@prisma/client";

export interface EventRepository {
  savePresentationViewEvents(events: Omit<LogPresentationView, "id">[]): Promise<any>;
  saveSlideViewEvents(events: Omit<LogSlideView, "id">[]): Promise<any>;
  saveLinkActionEvents(events: Omit<LogLinkAction, "id" | "linkType">[]): Promise<any>;
  saveMediaActionEvents(
    events: Omit<LogMediaAction, "id" | "mediaType" | "actionType">[],
  ): Promise<any>;
  saveQuizActionEvents(events: Omit<LogQuizAction, "id" | "actionType">[]): Promise<any>;
}

export class PrismaEventRepository implements EventRepository {
  async savePresentationViewEvents(events: Omit<LogPresentationView, "id">[]) {
    return prisma.logPresentationView.createMany({
      data: events,
      skipDuplicates: true,
    });
  }

  async saveSlideViewEvents(events: Omit<LogSlideView, "id">[]) {
    return prisma.logSlideView.createMany({
      data: events,
      skipDuplicates: true,
    });
  }

  async saveLinkActionEvents(events: Omit<LogLinkAction, "id" | "linkType">[]) {
    return prisma.logLinkAction.createMany({
      data: events as Omit<LogLinkAction, "id">[],
      skipDuplicates: true,
    });
  }

  async saveMediaActionEvents(events: Omit<LogMediaAction, "id" | "mediaType" | "actionType">[]) {
    return prisma.logMediaAction.createMany({
      data: events as Omit<LogMediaAction, "id">[],
      skipDuplicates: true,
    });
  }

  async saveQuizActionEvents(events: Omit<LogQuizAction, "id" | "actionType">[]) {
    return prisma.logQuizAction.createMany({
      data: events as Omit<LogQuizAction, "id">[],
      skipDuplicates: true,
    });
  }
}
