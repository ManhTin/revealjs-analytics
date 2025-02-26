import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserEvents() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user not found");

  return await prisma.logSlideView.findMany({
    where: {
      presentation: {
        userId,
      },
    },
  });
}
