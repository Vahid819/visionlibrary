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
import { Eye, EyeOff } from "lucide-react";
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
  const [edit, setEdit] = useContext(EditdataContext);

  const editinputs = () => (edit === true ? setEdit(false) : setEdit(true));

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setEdit(!edit);
  };
  return (
    <div className="mt-3">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Add you payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-row items-center justify-center">
              <Controller
                name="upi"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>Enter your UPI Id</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="file"
                      accept="image/*"
                      placeholder="UPI Id"
                      disabled={!edit}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row mt-3">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={editinputs}>
                Edit
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
