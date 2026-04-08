"use client";

import { motion } from "framer-motion";

export function BookingItem({ name, seat, time }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
          {name.charAt(0)}
        </div>

        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">Seat {seat}</p>
        </div>
      </div>

      <span className="text-xs text-muted-foreground">{time}</span>
    </motion.div>
  );
}