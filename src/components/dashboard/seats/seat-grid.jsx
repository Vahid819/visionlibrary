"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeatItem } from "./seat-item";

const totalSeats = 40;
const seatsPerRow = 8;
const occupiedSeats = [2, 3, 7, 15, 22];

// 🔥 animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export function SeatGrid() {
  const [selected, setSelected] = useState([]);

  const toggleSeat = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    setSelected((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <motion.div
      className="space-y-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: Math.ceil(totalSeats / seatsPerRow) }).map(
        (_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
              const seatNumber = rowIndex * seatsPerRow + colIndex + 1;
              if (seatNumber > totalSeats) return null;

              return (
                <motion.div key={seatNumber} variants={itemVariants}>
                  <SeatItem
                    seatId={seatNumber}
                    isOccupied={occupiedSeats.includes(seatNumber)}
                    isSelected={selected.includes(seatNumber)}
                    onClick={() => toggleSeat(seatNumber)}
                  />
                </motion.div>
              );
            })}
          </div>
        )
      )}
    </motion.div>
  );
}