import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserEvents() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) throw new Error("No user not found");

  return await prisma.event.findMany({
    where: {
      presentation: {
        user: { email },
      },
    },
    take: 300,
    orderBy: {
      timestamp: "desc",
    },
  });
}
