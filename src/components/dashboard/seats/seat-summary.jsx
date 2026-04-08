"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SeatSummary() {
  return (
    <Card className="p-4 bg-background/60 backdrop-blur border border-border/50">
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Booking Summary</h3>
          <p className="text-xs text-muted-foreground">
            Selected seats will appear here
          </p>
        </div>

        <div className="text-sm">
          <p>Seats: None</p>
          <p>Total: ₹0</p>
        </div>

        <Button className="w-full">Confirm Booking</Button>
      </CardContent>
    </Card>
  );
}