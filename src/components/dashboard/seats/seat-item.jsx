"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export function SeatItem({
  seatId,
  seatNumber,
  isAvailable,
  isSelected,
  onClick,
  userName,
}) {
  // ✅ Clickable only when NOT available
  const isClickable = !isAvailable;

  return (
    <motion.button
      onClick={onClick}
      disabled={!isClickable}
      layout
      whileHover={
        isClickable
          ? { scale: 1.08, y: -3 }
          : {}
      }
      whileTap={
        isClickable
          ? { scale: 0.95 }
          : {}
      }
      animate={
        isSelected
          ? {
              scale: [1, 1.08, 1],
            }
          : {}
      }
      transition={{
        duration: 0.3,
      }}
      className={clsx(
        "group relative overflow-hidden",
        "w-11 h-11 rounded-xl",
        "flex items-center justify-center",
        "text-xs font-semibold",
        "border transition-all duration-300",

        // ❌ Blocked (Available)
        isAvailable &&
          "bg-muted text-muted-foreground border-border opacity-60 cursor-not-allowed",

        // ✅ Selected
        isSelected &&
          "bg-white text-black border-white shadow-2xl ring-2 ring-white/40",

        // ✅ Clickable (Not Available)
        isClickable &&
          !isSelected &&
          "bg-background text-foreground border-border hover:bg-muted hover:shadow-md cursor-pointer"
      )}
      aria-pressed={isSelected}
      aria-disabled={!isClickable}
    >
      {/* ✨ Glow Animation */}
      {isSelected && (
        <motion.span
          layoutId={`seat-glow-${seatId}`}
          initial={{
            opacity: 0,
            scale: 0.6,
          }}
          animate={{
            opacity: [0.4, 1, 0.7],
            scale: [1, 1.35, 1.1],
          }}
          exit={{
            opacity: 0,
            scale: 0.6,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
            absolute inset-0
            rounded-xl
            bg-white/50
            blur-2xl
            z-0
          "
        />
      )}

      {/* 🔵 Status Dot */}
      <span
        className={clsx(
          "absolute top-1 right-1 w-2 h-2 rounded-full z-20",
          isClickable
            ? "bg-red-500"
            : "bg-green-500"
        )}
      />

      {/* Seat Number */}
      <span className="relative z-10 tracking-tight">
        {seatNumber}
      </span>

      {/* Tooltip */}
      {userName && (
        <div className="absolute -top-8 hidden group-hover:block z-30">
          <div
            className="
              text-[10px]
              px-2 py-1
              rounded-md
              shadow-md
              bg-popover
              text-popover-foreground
              border border-border
            "
          >
            {userName}
          </div>
        </div>
      )}
    </motion.button>
  );
}