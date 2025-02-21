import Header from "@/components/header";
import PresentationForm, {} from "@/components/presentation/presentation-form";
import { formSubmitAction } from "@/components/presentation/presentation-form-create-action";
import { ChevronLeft } from "lucide-react";

export default function NewPresentation() {
  return (
    <>
      <Header
        title="Create Presentation"
        action={{ path: "/presentations", label: "Back", icon: ChevronLeft }}
      />
      <PresentationForm formSubmitAction={formSubmitAction} />
    </>
  );
}
