import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PresentationsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return;
  }

  const presentations = await prisma.presentation.findMany({
    where: { userId: userId },
    include: {
      _count: {
        select: { events: true },
      },
    },
  });

  return <Header title="Presentations" actionPath="/presentations/new" />;
}
