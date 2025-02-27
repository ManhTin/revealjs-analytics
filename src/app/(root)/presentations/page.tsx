import Header from "@/components/header";
import { PresentationTable } from "@/components/presentation/presentation-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { auth } from "@/lib/auth";
import { presentationRepository } from "@/repositories";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function PresentationsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

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
  const data = await presentationRepository.getPresentationsByUser(userId);

  return <PresentationTable data={data} />;
}
