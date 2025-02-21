import { z } from "zod";

export const PresentationFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, {
      message: "Title must be at least 4 characters long",
    })
    .max(40, {
      message: "Title must be at most 40 characters long",
    }),
  description: z.string().trim().optional(),
  url: z.string().trim().url({ message: "Invalid URL" }),
});
