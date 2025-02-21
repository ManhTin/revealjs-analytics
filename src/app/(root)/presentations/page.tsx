import Header from "@/components/header";
import { PresentationTable } from "@/components/presentation/presentation-table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";

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
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <Header
        title="Presentations"
        action={{ path: "/presentations/create", label: "Create", icon: Plus }}
      />
      <PresentationTable data={data} />
    </>
  );
}
