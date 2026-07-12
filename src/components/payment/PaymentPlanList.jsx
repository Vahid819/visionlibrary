"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

export default function PaymentPlanList({
  plans = [],
  onEdit,
  onDelete,
}) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Existing Payment Plans</CardTitle>
      </CardHeader>

      <CardContent>
        {plans.length === 0 ? (
          <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            No payment plans created yet.
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="flex flex-col gap-4 rounded-xl border bg-card p-5 transition-all hover:border-primary/40 md:flex-row md:items-center md:justify-between"
              >
                {/* Left */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {plan.planName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      ₹{plan.planAmount}
                    </div>

                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {plan.totalPlan} Days
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onEdit(plan)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => onDelete(plan._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}