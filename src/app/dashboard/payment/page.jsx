"use client";

import { PaymentHeader } from "@/components/dashboard/payment/payment-header";
import { PaymentStats } from "@/components/dashboard/payment/payment-stats";
import { PaymentTable } from "@/components/dashboard/payment/payment-table";
import { PaymentFilters } from "@/components/dashboard/payment/payment-filters";

export default function PaymentPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PaymentHeader />

      {/* Filters */}
      <PaymentFilters />

      {/* Stats */}
      <PaymentStats />

      {/* Table */}
      <PaymentTable />
    </div>
  );
}