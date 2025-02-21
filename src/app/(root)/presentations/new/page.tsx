import Header from "@/components/header";
import PresentationForm, {} from "@/components/presentation/presentation-form";
import { formSubmitAction } from "@/components/presentation/presentation-form-submit-action";

export default function NewPresentation() {
  return (
    <>
      <Header title="Create Presentation" />
      <PresentationForm formSubmitAction={formSubmitAction} />
    </>
  );
}
