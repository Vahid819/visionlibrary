'use client";'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsSection } from "@/components/dashboard/stats-section";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { SeatLayout } from "@/components/dashboard/seat/seat-layout";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log("Session in dashboard:", session);

  if (!session) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsSection />

      <div className="grid gap-4 lg:grid-cols-3">
        <RecentBookings />
        <QuickActions />
      </div>
      <SeatLayout />
    </div>
  );
}