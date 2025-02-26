import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getPresentationsByUser() {
  const session = await auth();
  const email = session!.user?.email;

  if (!email) throw new Error("Invalid user");

  return await prisma.presentation.findMany({
    where: { user: { email } },
    include: {
      _count: {
        select: {
          events: { where: { eventName: "ready" } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
