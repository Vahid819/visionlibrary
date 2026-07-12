"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Plus, Trash2, IndianRupee } from "lucide-react";

export default function PaymentPlanItem({
  index,
  control,
  errors,
  remove,
  append,
  isLast,
  disabled,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-end rounded-lg border border-border bg-card/50 p-4">
      {/* Plan Name */}
      <div className="flex-1 w-full">
        <Controller
          name={`plans.${index}.name`}
          control={control}
          rules={{
            required: "Plan name is required",
          }}
          render={({ field, fieldState }) => (
            <Field data-error={fieldState.invalid}>
              <FieldLabel>Plan Name</FieldLabel>

              <Input
                {...field}
                placeholder="Monthly Plan"
                disabled={disabled}
              />

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>

      {/* Plan Amount */}
      <div className="w-full lg:w-56">
        <Controller
          name={`plans.${index}.amount`}
          control={control}
          rules={{
            required: "Amount is required",
          }}
          render={({ field, fieldState }) => (
            <Field data-error={fieldState.invalid}>
              <FieldLabel>Amount</FieldLabel>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  {...field}
                  type="number"
                  placeholder="500"
                  className="pl-9"
                  disabled={disabled}
                />
              </div>

              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>

      {/* Total Plan */}
      <div className="w-full lg:w-56">
        <Controller
          name={`plans.${index}.totalPlan`}
          control={control}
          rules={{
            required: "Total plan is required",
          }}
          render={({ field, fieldState }) => (
            <Field data-error={fieldState.invalid}>
              <FieldLabel>Total Plan (Days)</FieldLabel>

              <Input
                {...field}
                type="number"
                placeholder="30"
                disabled={disabled}
              />
              {fieldState.error && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
          
      {/* Actions */}
      <div className="flex items-center gap-2">
        {isLast && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={disabled}
            onClick={() =>
              append({
                name: "",
                amount: "",
              })
            }
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}

        <Button
          type="button"
          size="icon"
          variant="destructive"
          disabled={disabled}
          onClick={() => remove(index)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}