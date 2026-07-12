"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import PaymentPlanItem from "./PaymentPlanItem";
import { EditdataContext } from "@/context/EditContext";
import PaymentPlanList from "./PaymentPlanList";

export default function PaymentPlanForm() {
  const [edit, setEdit] = useContext(EditdataContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      plans: [
        {
          name: "",
          amount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plans",
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("/api/setting/payment-plan");

        if (data.success) {
          setPlans(data.data);
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

  const handleEditPlan = (plan) => {
    reset({
      plans: [
        {
          name: plan.planName,
          amount: plan.planAmount,
          totalPlan: plan.totalPlan,
        },
      ],
    });

    setEditingPlan(plan);
    setEdit(true);
  };

  const handleDeletePlan = async (id) => {
    try {
      const { data } = await axios.delete(`/api/setting/payment-plan?id=${id}`);

      toast.success(data.message);

      setPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete plan");
    }
  };

  const onSubmit = async (formData) => {
    try {
      setSaving(true);

      const payload = {
        plans: formData.plans.map((plan) => ({
          planName: plan.name,
          planAmount: Number(plan.amount),
          totalPlan: Number(plan.totalPlan || 30), // default if not entered
        })),
      };

      let response;

      if (editingPlan) {
        response = await axios.put("/api/setting/payment-plan", {
          planId: editingPlan._id,
          planName: formData.plans[0].name,
          planAmount: Number(formData.plans[0].amount),
          totalPlan: Number(formData.plans[0].totalPlan),
        });
      } else {
        response = await axios.post("/api/setting/payment-plan", payload);
      }

      const { data } = response;

      toast.success(data.message);

      setPlans(data.data.plans || data.data);

      setEditingPlan(null);

      reset({
        plans: [
          {
            name: "",
            amount: "",
            totalPlan: "",
          },
        ],
      });

      // Disable edit mode
      setEdit(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save payment plans",
      );
    } finally {
      setSaving(false);
      setEdit(false);
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
      {fields.map((field, index) => (
        <PaymentPlanItem
          key={field.id}
          index={index}
          control={control}
          append={append}
          remove={
            index > 0
              ? remove
              : () => toast.error("At least one plan is required")
          }
          isLast={index === fields.length - 1}
          disabled={!edit}
        />
      ))}
    </CardContent>

    <CardFooter className="flex justify-end gap-3 border-t pt-6">
      <Button type="button" variant="outline" onClick={handleEdit}>
        {edit ? "Cancel" : "Edit"}
      </Button>

      <Button type="submit" disabled={!edit || saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </CardFooter>
  </form>

  <PaymentPlanList
    plans={plans}
    onEdit={handleEditPlan}
    onDelete={handleDeletePlan}
  />
</Card>
  );
}
