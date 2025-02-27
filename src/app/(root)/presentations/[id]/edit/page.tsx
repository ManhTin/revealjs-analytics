import Header from "@/components/header";
import PresentationForm, {} from "@/components/presentation/presentation-form";
import { formSubmitAction } from "@/components/presentation/presentation-form-update-action";
import { auth } from "@/lib/auth";
import { PresentationRepository } from "@/repositories";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EditPresentation({ params }: { params: { id: string } }) {
  const { id } = await params;

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

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
