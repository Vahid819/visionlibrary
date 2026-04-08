"use client";

import { motion } from "framer-motion";

export function SeatItem({ seatId, isOccupied, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      layout
      whileHover={!isOccupied ? { scale: 1.15, y: -2 } : {}}
      whileTap={!isOccupied ? { scale: 0.9 } : {}}
      animate={
        isSelected
          ? {
              scale: [1, 1.1, 1],
              transition: { duration: 0.3 },
            }
          : {}
      }
      className={`
        w-10 h-10 rounded-lg text-xs font-medium
        flex items-center justify-center
        transition-all relative

        ${
          isOccupied
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : isSelected
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-background border border-border hover:bg-muted/40"
        }
      `}
    >
      {/* 🔥 glow effect */}
      {isSelected && (
        <span className="absolute inset-0 rounded-lg bg-primary/20 blur-md -z-10" />
      )}

      {seatId}
    </motion.button>
  );
}