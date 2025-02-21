import { EventTable } from "@/components/event/event-table";
import Header from "@/components/header";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function EventsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <Header title="Event Log" />
      <Suspense fallback={<DataTableSkeleton rowCount={15} columnCount={6} />}>
        <EventTableWrapper userId={session.user?.id} />
      </Suspense>
    </>
  );
}

async function EventTableWrapper({ userId }: { userId: string | undefined }) {
  const data = await prisma.event.findMany({
    where: {
      presentation: {
        userId: userId,
      },
    },
    take: 300,
    orderBy: {
      timestamp: "desc",
    },
  });

  return <EventTable data={data} />;
}
