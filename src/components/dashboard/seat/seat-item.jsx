"use client";

import { motion } from "framer-motion";

export function SeatItem({ seatId, seatNumber, isOccupied, isSelected, onClick }) {
  const isDisabled = isOccupied; // 🔥 occupied = disabled

  return (
    <motion.button
      onClick={() => {
        if (isDisabled) return; // 🚫 HARD BLOCK
        onClick();
      }}
      disabled={isDisabled}
      layout
      whileHover={!isDisabled ? { scale: 1.15, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.9 } : {}}
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
          isDisabled
            ? "bg-red-400 text-white cursor-not-allowed opacity-60"
            : isSelected
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-background border border-border hover:bg-muted/40"
        }
      `}
    >
      {/* glow */}
      {isSelected && !isDisabled && (
        <span className="absolute inset-0 rounded-lg bg-primary/20 blur-md -z-10" />
      )}

      {seatNumber}
    </motion.button>
  );
}