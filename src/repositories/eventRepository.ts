import { prisma } from "@/lib/prisma";
import type {
  LogLinkAction,
  LogMediaAction,
  LogPresentationClose,
  LogPresentationStart,
  LogQuizAction,
  LogSlideView,
  Prisma,
} from "@prisma/client";

export interface EventRepository {
  savePresentationStartEvents(
    events: Omit<LogPresentationStart, "id">[],
  ): Promise<Prisma.BatchPayload>;
  savePresentationCloseEvents(
    events: Omit<LogPresentationClose, "id">[],
  ): Promise<Prisma.BatchPayload>;
  saveSlideViewEvents(events: Omit<LogSlideView, "id">[]): Promise<Prisma.BatchPayload>;
  saveLinkActionEvents(
    events: Omit<LogLinkAction, "id" | "linkType">[],
  ): Promise<Prisma.BatchPayload>;
  saveMediaActionEvents(
    events: Omit<LogMediaAction, "id" | "mediaType" | "actionType">[],
  ): Promise<Prisma.BatchPayload>;
  saveQuizActionEvents(
    events: Omit<LogQuizAction, "id" | "actionType">[],
  ): Promise<Prisma.BatchPayload>;
}

export class PrismaEventRepository implements EventRepository {
  savePresentationStartEvents(events: Omit<LogPresentationStart, "id>">[]) {
    return prisma.logPresentationStart.createMany({
      data: events,
      skipDuplicates: true,
    });
  }

  savePresentationCloseEvents(events: Omit<LogPresentationClose, "id">[]) {
    return prisma.logPresentationClose.createMany({
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
