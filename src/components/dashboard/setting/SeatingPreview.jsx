"use client";

import { motion } from "framer-motion";

export default function SeatingPreview({ rows, cols }) {
  let counter = 1;

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const seatNumber = counter++;

          return (
            <motion.div
              key={seatNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: (r * cols + c) * 0.02, // 🔥 stagger effect
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#3b82f6",
                color: "#fff",
              }}
              whileTap={{ scale: 0.95 }}
              className="h-10 w-10 rounded-lg border flex items-center justify-center text-sm font-medium bg-muted cursor-pointer transition"
            >
              {seatNumber}
            </motion.div>
          );
        })
      )}
    </div>
  );
}