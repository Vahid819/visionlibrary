"use client";

import React from "react";
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

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

function Message() {
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  function onSubmit(data) {
    console.log("FORM DATA:", data);

    toast("Submitted successfully", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message</CardTitle>
        <CardDescription>
          View the content of the message here.
        </CardDescription>
      </CardHeader>

      {/* ✅ FORM START */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FieldGroup>
            {/* SUBJECT */}
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Subject</FieldLabel>
                  <Input {...field} />
                  <FieldDescription>
                    The subject of the message.
                  </FieldDescription>
                  <FieldError>
                    {fieldState.error?.message}
                  </FieldError>
                </Field>
              )}
            />

            {/* CONTENT */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea {...field} />
                  </InputGroup>
                  <FieldDescription>
                    The content of the message.
                  </FieldDescription>
                  <FieldError>
                    {fieldState.error?.message}
                  </FieldError>
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter>
          {/* ✅ Button now properly submits */}
          <Button type="submit">Send</Button>
        </CardFooter>
      </form>
      {/* ✅ FORM END */}
    </Card>
  );
}

export default Message;