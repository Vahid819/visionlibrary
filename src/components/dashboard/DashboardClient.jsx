"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsSection } from "@/components/dashboard/stats-section";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { SeatLayout } from "@/components/dashboard/seat/seat-layout";

export default function DashboardClient({ session }) {
  const [seats, setSeats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/setting/get", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch seats");
      }

      const text = await res.text();
      const result = text ? JSON.parse(text) : {};
    //   console.log(result)
      setSeats(result?.data || {});
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError("Failed to load seats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">
        Loading seats...
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchSeats}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsSection />

      <div className="grid gap-4 lg:grid-cols-3">
        <RecentBookings />
        <QuickActions />
      </div>

      <SeatLayout seats={seats} />
    </div>
  );
}