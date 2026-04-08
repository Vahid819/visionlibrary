"use client";

import { SeatHeader } from "@/components/dashboard/seats/seat-header";
import { SeatLayout } from "@/components/dashboard/seats/seat-layout";
import { SeatSummary } from "@/components/dashboard/seats/seat-summary";

export default function SeatPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SeatHeader />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Seat Layout */}
        <div className="lg:col-span-2">
          <SeatLayout />
        </div>

        {/* Summary Panel */}
        <SeatSummary />
      </div>
    </div>
  );
}