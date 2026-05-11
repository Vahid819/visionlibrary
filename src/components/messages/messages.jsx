"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { messageSchema } from "@/zodSchema/messageSchema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

export default function Message({ selectedStudent }) {
  const [isSending, setIsSending] = useState(false);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  async function onSubmit(data) {
    if (!selectedStudent) {
      toast.error("Please select a student from the table first.");
      return;
    }

    if (!selectedStudent.phone) {
      toast.error("This student does not have a phone number on file.");
      return;
    }

    setIsSending(true);

    try {
      // Call our new Twilio API route
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: selectedStudent.phone,
          subject: data.subject,
          content: data.content,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      toast.success(`WhatsApp message sent successfully to ${selectedStudent.name}!`);
      
      // Optional: Clear the form after sending
      form.reset();

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Twilio WhatsApp Message</CardTitle>
        <CardDescription>
          {selectedStudent 
            ? <span>Sending to: <strong className="text-primary">{selectedStudent.name}</strong> ({selectedStudent.phone})</span> 
            : <span className="text-red-500">No student selected. Please select one from the list.</span>
          }
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Subject</FieldLabel>
                  <Input {...field} placeholder="e.g., Important Update" disabled={!selectedStudent || isSending} />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea {...field} placeholder="Type your message here..." disabled={!selectedStudent || isSending} />
                  </InputGroup>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={!selectedStudent || isSending}>
            {isSending ? "Sending..." : "Send via WhatsApp API"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}