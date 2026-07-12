"use client";

import PaymentHeader from "@/components/payment/PaymentHeader";
import PaymentPlanForm from "@/components/payment/PaymentPlanForm";


export default function PaymentPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl space-y-6 p-6">

        {/* Header */}
        <PaymentHeader />

        {/* Form */}
        <PaymentPlanForm />

        

      </div>
    </div>
  );
}