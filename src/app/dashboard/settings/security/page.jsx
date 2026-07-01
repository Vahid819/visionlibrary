"use client";

import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditdataContext } from "@/context/EditContext";
import { Controller, useForm } from "react-hook-form";

function page() {
    const [edit, setEdit, session] = useContext(EditdataContext);
  const [show, setShow] = useState(false)

    const editinputs = () => (edit === true ? setEdit(false) : setEdit(true));


  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    
  };

  return (
    <div className="mt-3">
      <Card>
        <CardHeader>
          <CardTitle>Password Change</CardTitle>
          <CardDescription>Set new Password</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-row items-center justify-center">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>New Password</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type={show ? "text" : "password"}
                      placeholder="New Password"
                      disabled={!edit}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      type={show ? "text" : "password"}
                      value={field.value ?? ""}
                      placeholder="Confirm Password"
                      disabled={!edit}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button type="button" onClick={()=>setShow(!show)}>
                {!show ? <Eye /> : <EyeOff />}
              </Button>
            </FieldGroup>
            <FieldGroup className="flex flex-row mt-3">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={editinputs}>Edit</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
