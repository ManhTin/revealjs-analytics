import Header from "@/components/header";
import { PresentationTable } from "@/components/presentation/presentation-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PresentationsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <Header
        title="Presentations"
        action={{ path: "/presentations/create", label: "Create", icon: Plus }}
      />
      <Suspense fallback={<DataTableSkeleton rowCount={10} columnCount={4} />}>
        <PresentationTableWrapper userId={session.user?.id} />
      </Suspense>
    </>
  );
}

async function PresentationTableWrapper({ userId }: { userId: string | undefined }) {
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

  return <PresentationTable data={data} />;
}
