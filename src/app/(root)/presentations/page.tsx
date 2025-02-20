import Header from "@/components/header";
import { PresentationTable } from "@/components/presentation/presentation-table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PresentationsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const data = await prisma.presentation.findMany({
    where: { userId: userId },
    include: {
      _count: {
        select: {
          events: { where: { eventName: "ready" } },
        },
      },
    },
  });

  return (
    <>
      <Header title="Presentations" actionPath="/presentations/new" />
      <PresentationTable data={data} />
    </>
  );
}
