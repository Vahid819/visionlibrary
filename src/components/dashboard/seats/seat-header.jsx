"use client";

import { motion } from "framer-motion";

export function SeatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-semibold">Seat Management</h1>
      <p className="text-sm text-muted-foreground">
        Select and manage seat bookings
      </p>
    </motion.div>
  );
}