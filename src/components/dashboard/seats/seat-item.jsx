"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export function SeatItem({
  seatId,
  isPending,
  isSelected,
  onClick,
  userName,
}) {
  const isAvailable = !isPending;

  return (
    <motion.button
      onClick={onClick}
      disabled={!isAvailable}
      layout
      whileHover={
        isAvailable ? { scale: 1.08, y: -3 } : {}
      }
      whileTap={
        isAvailable ? { scale: 0.95 } : {}
      }
      animate={
        isSelected
          ? {
              scale: [1, 1.06, 1],
              transition: { duration: 0.25 },
            }
          : {}
      }
      className={clsx(
        "group relative w-11 h-11 rounded-xl text-xs font-semibold",
        "flex items-center justify-center",
        "transition-all duration-200 border backdrop-blur-sm",

        // ❌ PENDING
        isPending &&
          "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-70",

        // ✅ SELECTED
        isSelected &&
          "bg-primary text-primary-foreground border-primary shadow-lg ring-2 ring-primary/30",

        // ✅ AVAILABLE
        isAvailable &&
          !isSelected &&
          "bg-background text-foreground border-border hover:bg-muted hover:shadow-md"
      )}
      aria-pressed={isSelected}
      aria-disabled={isPending}
    >
      {/* 🔵 Status Dot */}
      <span
        className={clsx(
          "absolute top-1 right-1 w-2 h-2 rounded-full",
          isPending
            ? "bg-destructive"
            : "bg-green-500 dark:bg-green-400"
        )}
      />

      {/* Seat Number */}
      <span className="tracking-tight">{seatId}</span>

      {/* 🔥 Glow effect */}
      {isSelected && (
        <motion.span
          layoutId="seat-glow"
          className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10"
        />
      )}

      {/* 🧠 Tooltip */}
      {userName && (
        <div className="absolute -top-8 hidden group-hover:block z-10">
          <div className="text-[10px] px-2 py-1 rounded-md shadow-md
            bg-popover text-popover-foreground border border-border">
            {userName}
          </div>
        </div>
      )}
    </motion.button>
  );
}