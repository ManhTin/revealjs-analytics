import Header from "@/components/header";
import { PresentationTable } from "@/components/presentation/presentation-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { getPresentationsByUser } from "@/data/presentation";
import { auth } from "@/lib/auth";
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
        <PresentationTableWrapper />
      </Suspense>
    </>
  );
}

async function PresentationTableWrapper() {
  const data = await getPresentationsByUser();

  return <PresentationTable data={data} />;
}
