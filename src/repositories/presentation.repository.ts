import { prisma } from "@/lib/prisma";
import type { Presentation, Prisma } from "@prisma/client";

export interface AbstractPresentationRepository {
  getPresentationsByUser(userId: string): Promise<
    (Presentation & {
      _count: {
        presentationCloses: number;
      };
    })[]
  >;

  getPresentationById(
    presentationId: string,
    userId: string,
  ): Promise<
    Presentation & {
      _count: {
        presentationCloses: number;
      };
    }
  >;

  createPresentation(data: Prisma.PresentationCreateInput): Promise<Presentation>;
  updatePresentation(id: string, data: Prisma.PresentationUpdateInput): Promise<Presentation>;
  deletePresentation(id: string): Promise<Presentation>;
}

export class PresentationRepository implements AbstractPresentationRepository {
  async getPresentationsByUser(userId: string) {
    return await prisma.presentation.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            presentationCloses: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  async getPresentationById(presentationId: string, userId: string) {
    return await prisma.presentation.findFirstOrThrow({
      where: { id: presentationId, userId },
      include: {
        _count: {
          select: {
            presentationCloses: true,
          },
        },
      },
    });
  }

  async createPresentation(data: Prisma.PresentationCreateInput) {
    return prisma.presentation.create({ data });
  }

  async updatePresentation(id: string, data: Prisma.PresentationUpdateInput) {
    return prisma.presentation.update({
      where: { id },
      data,
    });
  }

  async deletePresentation(id: string) {
    return prisma.presentation.delete({
      where: { id },
    });
  }
}
