"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Loader2, Phone, User } from "lucide-react";

import { messageSchema } from "@/zodSchema/messageSchema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function Message({ selectedStudent }) {
  const [isSending, setIsSending] = useState(false);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const content = form.watch("content");

  async function onSubmit(values) {
    if (!selectedStudent) {
      toast.error("Please select a student first.");
      return;
    }

    if (!selectedStudent.phone) {
      toast.error("Phone number not found.");
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: selectedStudent.phone,
          subject: values.subject,
          content: values.content,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("Message sent successfully.");

      form.reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          WhatsApp Message
        </CardTitle>

        <CardDescription>
          Send a WhatsApp message directly to a student.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        {selectedStudent ? (
          <div className="rounded-lg border bg-muted/40 p-4 space-y-2">

            <div className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              <span className="font-medium">
                {selectedStudent.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" />
              {selectedStudent.phone}
            </div>

          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
            Select a student from the table to start sending messages.
          </div>
        )}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <FieldGroup>

            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>

                  <FieldLabel>
                    Subject
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="Payment Reminder"
                    disabled={!selectedStudent || isSending}
                  />

                  <FieldError>
                    {fieldState.error?.message}
                  </FieldError>

                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>

                  <FieldLabel>
                    Message
                  </FieldLabel>

                  <InputGroup>

                    <InputGroupTextarea
                      {...field}
                      rows={7}
                      placeholder="Write your message..."
                      disabled={!selectedStudent || isSending}
                    />

                  </InputGroup>

                  <div className="flex justify-between mt-2">

                    <FieldError>
                      {fieldState.error?.message}
                    </FieldError>

                    <span className="text-xs text-muted-foreground">
                      {content.length}/1000
                    </span>

                  </div>

                </Field>
              )}
            />

          </FieldGroup>

          <Button
            className="w-full"
            disabled={!selectedStudent || isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send WhatsApp Message"
            )}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}