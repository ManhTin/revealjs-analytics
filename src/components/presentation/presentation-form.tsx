"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PresentationFormSchema } from "./presentation-form-schema";

export type PresentationSubmitResult = {
  message: string;
  error?: boolean;
  description?: string;
};

interface PresentationFormProps {
  formSubmitAction: (formData: FormData) => Promise<PresentationSubmitResult>;
  initialValues?: z.infer<typeof PresentationFormSchema>;
}

export default function PresentationForm({
  formSubmitAction,
  initialValues,
}: PresentationFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PresentationFormSchema>>({
    resolver: zodResolver(PresentationFormSchema),
    defaultValues: initialValues ?? {
      title: "",
      description: "",
      url: "",
    },
  });

  async function onSubmit(data: z.infer<typeof PresentationFormSchema>) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description ?? "");
    formData.append("url", data.url);

    const result = await formSubmitAction(formData);

    toast({
      title: result.message,
      variant: result.error ? "destructive" : "default",
      description: result.description,
    });
    redirect("/presentations");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science 101" {...field} />
              </FormControl>
              <FormDescription>Title of the Presentation</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Introduction lecture for datastructures and algorithms."
                  {...field}
                />
              </FormControl>
              <FormDescription>Short description of the content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.edu/cs101" {...field} />
              </FormControl>
              <FormDescription>URL to the reveal.js presentation</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
