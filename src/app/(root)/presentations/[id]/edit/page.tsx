import Header from "@/components/header";
import PresentationForm, {} from "@/components/presentation/presentation-form";
import { formSubmitAction } from "@/components/presentation/presentation-form-update-action";
import { findUserOrRedirect } from "@/lib/utils";
import { PresentationRepository } from "@/repositories";
import { ChevronLeft } from "lucide-react";

export default async function EditPresentation({ params }: { params: { id: string } }) {
  const { id } = await params;

  const userId = await findUserOrRedirect();

  const presentationRepository = new PresentationRepository():
  const presentation = await presentationRepository.getPresentationById(id, userId);

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
