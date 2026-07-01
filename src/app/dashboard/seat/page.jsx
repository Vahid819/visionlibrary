"use client";

import { useEffect, useState } from "react";
import { SeatHeader } from "@/components/dashboard/seats/seat-header";
import { SeatLayout } from "@/components/dashboard/seats/seat-layout";
import { SeatSummary } from "@/components/dashboard/seats/seat-summary";
import SeatsSkeleton from "@/components/skeleton/SeatsSkeleton";

export default function SeatPage() {
  const [seats, setSeats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch("/api/setting/setas", {
          cache: "no-store", // 🔥 important for fresh data
        });

        const result = await res.json();

        // ✅ store data properly
        setSeats(result.data || {});

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, []);


  if (loading) {
    return <SeatsSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <SeatHeader />

      <div className=" gap-6">
        {/* Seat Layout */}
        <div className="lg:w-full">
          <SeatLayout seats={seats} />
        </div>

        {/* Summary Panel */}
        {/* <SeatSummary seats={seats} /> */}
      </div>
    </div>
  );
}