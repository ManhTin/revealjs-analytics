"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { type Presentation, Prisma } from "@prisma/client";
import type { PresentationSubmitResult } from "./presentation-form";
import { PresentationFormSchema } from "./presentation-form-schema";

export async function formSubmitAction(
  data: FormData,
  presentation?: Presentation,
): Promise<PresentationSubmitResult> {
  const formData = Object.fromEntries(data);
  const parsed = PresentationFormSchema.safeParse(formData);

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || !presentation) {
    return { message: "Not found", error: true, description: "" };
  }

  if (!parsed.success) {
    return {
      message: "Error updating form:",
      error: true,
      description: "Check the form fields",
    };
  }

  try {
    await prisma.presentation.update({
      where: { id: presentation.id, userId },
      data: {
        ...parsed.data,
      },
    });
    return { message: `Presentation ${parsed.data.title} updated` };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        message: "Error updating presentation",
        error: true,
        description:
          error.code === "P2002"
            ? "Presentation with this URL already exists"
            : "Could not insert presentation",
      };
    }

    return {
      message: "Error creating presentation",
      error: true,
    };
  }
}
