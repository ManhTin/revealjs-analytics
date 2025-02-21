"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { PresentationSubmitResult } from "./presentation-form";
import { PresentationFormSchema } from "./presentation-form-schema";

export async function formSubmitAction(data: FormData): Promise<PresentationSubmitResult> {
  const formData = Object.fromEntries(data);
  const parsed = PresentationFormSchema.safeParse(formData);

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { message: "User not found", error: true, description: "Please log in" };
  }

  if (!parsed.success) {
    return {
      message: "Error creating form:",
      error: true,
      description: "Check the form fields",
    };
  }

  try {
    await prisma.presentation.create({
      data: {
        ...parsed.data,
        userId,
      },
    });
    return { message: `Presentation ${parsed.data.title} created` };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        message: "Error creating presentation",
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
