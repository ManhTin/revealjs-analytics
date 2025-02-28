import Header from "@/components/header";
import { PresentationTable } from "@/components/presentation/presentation-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { findUserOrRedirect } from "@/lib/utils";
import { PresentationRepository } from "@/repositories";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default async function PresentationsPage() {
  const userId = await findUserOrRedirect();

  return (
    <>
      <Header
        title="Presentations"
        action={{ path: "/presentations/create", label: "Create", icon: Plus }}
      />
      <Suspense fallback={<DataTableSkeleton rowCount={10} columnCount={4} />}>
        <PresentationTableWrapper userId={userId} />
      </Suspense>
    </>
  );
}

async function PresentationTableWrapper({ userId }: { userId: string }) {
  const presentationRepository = new PresentationRepository();
  const data = await presentationRepository.getPresentationsByUser(userId);

  return <PresentationTable data={data} />;
}
