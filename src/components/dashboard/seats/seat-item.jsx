"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export function SeatItem({
  seatNumber,
  isOccupied,
  isSelected,
  onClick,
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={!isOccupied}
      whileHover={
        isOccupied
          ? {
              scale: 1.08,
              y: -2,
            }
          : {}
      }
      whileTap={
        isOccupied
          ? {
              scale: 0.95,
            }
          : {}
      }
      className={clsx(
        "relative flex items-center justify-center",
        "size-11 rounded-xl border text-xs font-semibold transition-all duration-200",

        // Available Seat
        !isOccupied &&
          "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-70",

        // Occupied Seat
        isOccupied &&
          "bg-background border-border cursor-pointer hover:bg-muted hover:shadow-md",

        // Selected Seat
        isSelected &&
          "ring-2 ring-primary bg-primary text-primary-foreground shadow-lg"
      )}
    >
      {/* Status Dot */}
      <span
        className={clsx(
          "absolute top-1 right-1 size-2 rounded-full",
          isOccupied ? "bg-red-500" : "bg-green-500"
        )}
      />

      {seatNumber}
    </motion.button>
  );
}