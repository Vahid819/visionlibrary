"use client";

import { motion } from "framer-motion";

export function SeatItem({
  seatId,
  isOccupied,
  isSelected,
  onClick,
}) {
  return (
    <motion.button
      whileHover={!isOccupied ? { scale: 1.1 } : {}}
      whileTap={!isOccupied ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`
        w-10 h-10 rounded-md text-xs font-medium
        flex items-center justify-center
        transition-all

        ${
          isOccupied
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-background border hover:bg-muted"
        }
      `}
    >
      {seatId}
    </motion.button>
  );
}