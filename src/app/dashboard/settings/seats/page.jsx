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
import { toast } from "sonner";
import axios from "axios";

function page() {
  const [edit, setEdit, session] = useContext(EditdataContext);

  const editinputs = () => (edit === true ? setEdit(false) : setEdit(true));

  const { control, handleSubmit } = useForm({
    defaultValues: {
      seatNumber: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.patch("/api/setting/setas", data);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message);
    }
    setEdit(!edit);
  };

  return (
    <div className="mt-3">
      <Card>
        <CardHeader>
          <CardTitle>SeatNumers</CardTitle>
          <CardDescription>Create no of seats</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="flex flex-row items-center justify-center">
              <Controller
                name="seatNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-error={fieldState.invalid}>
                    <FieldLabel>SeatNumber</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="number"
                      placeholder="Seat Number"
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
