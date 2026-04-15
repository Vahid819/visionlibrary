"use client";

import { SeatGrid } from "./seat-grid";
import { SeatLegend } from "./seat-legend";

export function SeatLayout({seats}) {
  // console.log(seats)
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Seat Layout</h2>
        <p className="text-sm text-muted-foreground">
          Select and manage seats
        </p>
      </div>

      {/* Legend */}
      <SeatLegend />

      {/* Grid */}
      <SeatGrid seats={seats}/>
    </div>
  );
}