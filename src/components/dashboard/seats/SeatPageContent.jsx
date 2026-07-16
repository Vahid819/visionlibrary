"use client";

import { useEffect, useState } from "react";
import { SeatHeader } from "@/components/dashboard/seats/seat-header";
import { SeatLayout } from "@/components/dashboard/seats/seat-layout";
import SeatsSkeleton from "@/components/skeleton/SeatsSkeleton";

export default function SeatPageContent({ studentId }) {
  const [seats, setSeats] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch("/api/setting/setas", {
          cache: "no-store",
        });

        const result = await res.json();
        // console.log("result:",result)

        setSeats(result.data || {});
      } catch (error) {
        console.error(error);
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

      <SeatLayout
        seats={seats}
        studentId={studentId}
      />
    </div>
  );
}