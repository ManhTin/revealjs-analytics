import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getPresentationById(presentationId: string) {
  const session = await auth();
  const email = session!.user?.email;

  if (!email) throw new Error("Invalid user");

  return await prisma.presentation.findFirstOrThrow({
    where: { id: presentationId, user: { email } },
    include: {
      _count: {
        select: {
          events: { where: { eventName: "ready" } },
        },
      },
    },
  });
}
