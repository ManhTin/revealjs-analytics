import { EventTable } from "@/components/event/event-table";
import Header from "@/components/header";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { getUserEvents } from "@/data/event";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function EventsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <Header title="Event Log" />
      <Suspense fallback={<DataTableSkeleton rowCount={15} columnCount={6} />}>
        <EventTableWrapper />
      </Suspense>
    </>
  );
}

async function EventTableWrapper() {
  const data = await getUserEvents();

  return <EventTable data={data} />;
}
