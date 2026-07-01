"use client";

import React, { useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
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
import axios from "axios";
import { toast } from "sonner";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function page() {
  const [edit, setEdit, session] = useContext(EditdataContext);

  const editinputs = () => (edit === true ? setEdit(false) : setEdit(true));


  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await axios.patch("/api/setting", data)
    toast.success(res.data.message);
    setEdit(!edit);
  };

  return (
    <div className="mt-3">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="gap-3">
          <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-row mb-3">
              <Controller
                name="firstName"
                control={control}
                className="w-[30%]"
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>First Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="First Name"
                      aria-invalid={fieldState.invalid}
                      disabled={!edit}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Last Name"
                      aria-invalid={fieldState.invalid}
                      disabled={!edit}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row mb-3">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>Phone</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Phone"
                      aria-invalid={fieldState.invalid}
                      disabled={!edit}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row">
              <Button type="submit" form="form-rhf-demo" className="p-3 ">
                Submit
              </Button>
              <Button type="button" onClick={editinputs} className="p-3">
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
