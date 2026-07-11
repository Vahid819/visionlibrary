"use client";

import { CreditCard } from "lucide-react";

export default function PaymentHeader() {
  return (
    <div className="rounded-xl border border-border bg-card px-6 py-6">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/15 border border-teal-500/20">
          <CreditCard className="h-7 w-7 text-teal-400" />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Payment Plan
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Add and manage your library membership payment plans.
          </p>
        </div>
      </div>
    </div>
  );
}