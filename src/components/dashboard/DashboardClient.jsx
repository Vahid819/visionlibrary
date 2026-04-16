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

      if (!res.ok) throw new Error("Failed to fetch seats");

      const text = await res.text();
      const result = text ? JSON.parse(text) : {};
      console.log(result)
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

  // 🔄 Loading UI (modern skeleton feel)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchSeats}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/40 p-4 md:p-6 space-y-6">
      
      {/* 🔝 Header */}
      <div className="sticky top-0 z-10 backdrop-blur bg-background/70 border-b border-border/40 rounded-xl p-3">
        <DashboardHeader />
      </div>

      {/* 📊 Stats */}
      <section>
        <StatsSection seats={seats} />
      </section>

      {/* ⚡ Main Grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Seat Layout */}
          <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground">
              Seat Layout
            </h2>
            <SeatLayout seats={seats} />
          </div>

          {/* Recent Bookings */}
          <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground">
              Recent Bookings
            </h2>
            <RecentBookings />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          
            <QuickActions />

        </div>
      </section>
    </div>
  );
}