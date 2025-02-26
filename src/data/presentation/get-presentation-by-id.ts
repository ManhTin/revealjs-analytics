import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getPresentationById(presentationId: string) {
  const session = await auth();
  const userId = session!.user?.id;

  if (!userId) throw new Error("Invalid user");

  return await prisma.presentation.findFirstOrThrow({
    where: { id: presentationId, userId },
    include: {
      _count: {
        select: {
          presentationViews: true,
        },
      },
    },
  });
}
