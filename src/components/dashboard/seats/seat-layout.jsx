"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SeatGrid } from "./seat-grid";
import { SeatLegend } from "./seat-legend";

export function SeatLayout() {
  return (
    <Card className="p-4 bg-background/60 backdrop-blur border border-border/50">
      <CardContent className="space-y-4">
        <SeatLegend />
        <SeatGrid />
      </CardContent>
    </Card>
  );
}