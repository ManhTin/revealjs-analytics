import Header from "@/components/header";
import PresentationForm, {} from "@/components/presentation/presentation-form";
import { formSubmitAction } from "@/components/presentation/presentation-form-update-action";
import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";

export default async function EditPresentation({ params }: { params: { id: string } }) {
  const presentationId = params.id;

  const presentation = await prisma.presentation.findFirstOrThrow({
    where: { id: presentationId },
  });

  return (
    <>
      <Header
        title="Edit Presentation"
        action={{ path: "/presentations", label: "Back", icon: ChevronLeft }}
      />
      <PresentationForm formSubmitAction={formSubmitAction} presentation={presentation} />
    </>
  );
}
