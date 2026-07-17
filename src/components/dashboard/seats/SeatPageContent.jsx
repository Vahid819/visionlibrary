"use client";

import { useEffect, useState } from "react";
import { SeatHeader } from "@/components/dashboard/seats/seat-header";
import { SeatLayout } from "@/components/dashboard/seats/seat-layout";
import SeatsSkeleton from "@/components/skeleton/SeatsSkeleton";
import axios from "axios";

export default function SeatPageContent({ studentId }) {
  const [seats, setSeats] = useState({});
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get("/api/setting/setas");

        setSeats(res.data || {});
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