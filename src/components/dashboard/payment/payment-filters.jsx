"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const filters = ["Today", "Week", "Month", "All"];

export function PaymentFilters() {
  const [active, setActive] = useState("Today");

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <Button
          key={f}
          variant={active === f ? "default" : "outline"}
          size="sm"
          onClick={() => setActive(f)}
        >
          {f}
        </Button>
      ))}
    </div>
  );
}