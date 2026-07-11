"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import PaymentPlanItem from "./PaymentPlanItem";
import { EditdataContext } from "@/context/EditContext";

export default function PaymentPlanForm() {
  const [edit, setEdit] = useContext(EditdataContext);
  const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      plans: [
        {
          name: "",
          amount: "",
        },
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "plans",
  });

  useEffect(() => {
  const fetchPlans = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/payment-plan");

      if (data.success && data.data?.length) {
        reset({
          plans: data.data,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to load payment plans");
    } finally {
      setLoading(false);
    }
  };

  fetchPlans();
}, []);

 const onSubmit = async (formData) => {
  try {
    setSaving(true);

    const { data } = await axios.post(
      "/api/payment-plan",
      formData
    );

    if (data.success) {
      toast.success("Payment plans updated");

      setEdit(false);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to save payment plans"
    );
  } finally {
    setSaving(false);
  }
};

if (loading) {
  return (
    <Card>
      <CardContent className="flex h-52 items-center justify-center">
        Loading payment plans...
      </CardContent>
    </Card>
  );
}

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <Card className="border-border bg-card shadow-sm">

      <form onSubmit={handleSubmit(onSubmit)}>

        <CardContent className="space-y-5 pt-6 pb-2">

          {/* Dynamic Plans */}

          {fields.map((field, index) => (
            <PaymentPlanItem
              key={field.id}
              index={index}
              control={control}
              append={append}
              remove={index > 0 ? remove :  () => toast.error("At least one plan is required")}
              isLast={index === fields.length - 1}
              disabled={!edit}
            />
          ))}

        </CardContent>

        <CardFooter className="flex justify-end gap-3 border-t pt-6">

          <Button
            type="button"
            variant="outline"
            onClick={handleEdit}
          >
            {edit ? "Cancel" : "Edit"}
          </Button>

          <Button
  type="submit"
  disabled={!edit || saving}
>
  {saving ? "Saving..." : "Save Changes"}
</Button>

        </CardFooter>

      </form>

    </Card>
  );
}