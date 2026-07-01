"use client";

import { motion } from "framer-motion";
import { CalendarDays, Armchair, User } from "lucide-react";

export function BookingItem({
  name,
  seat,
  date,
  status = "Active",
}) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/40 transition-colors"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
          {initials}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            <p className="font-medium">{name}</p>
          </div>

          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Armchair className="size-4" />
              Seat {seat}
            </div>

            <div className="flex items-center gap-1">
              <CalendarDays className="size-4" />
              {new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
        {status}
      </span>
    </motion.div>
  );
}