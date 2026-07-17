"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SeatGrid } from "./seat-grid";
import { SeatLegend } from "./seat-legend";
import { useState } from "react";
import StudentDetails from "./StudentDetails";

export function SeatLayout({ seats, studentId }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  return (
    <Card className="p-4 bg-background/60 backdrop-blur border border-border/50">
      <CardContent className="space-y-4">
        <SeatLegend />

        {/* ✅ Pass seats to grid */}
        <SeatGrid seats={seats} onSelectStudent={setSelectedStudent} />

        <StudentDetails student={selectedStudent} />
      </CardContent>
    </Card>
  );
}
