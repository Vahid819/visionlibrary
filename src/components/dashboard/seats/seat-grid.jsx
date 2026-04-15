"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeatItem } from "./seat-item";

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

export function SeatGrid({ seats }) {
  const [selected, setSelected] = useState([]);

  const seatKeys = Object.keys(seats || {});

  const toggleSeat = (seatKey) => {
    // 🚫 prevent selecting occupied seats
    if (seats[seatKey]?.isOccupied) return;

    setSelected((prev) =>
      prev.includes(seatKey)
        ? prev.filter((s) => s !== seatKey)
        : [...prev, seatKey]
    );
  };

  if (!seatKeys.length) {
    return <p className="text-center text-muted-foreground">No seats found</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-8 gap-2 justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {seatKeys.map((seatKey) => {
        const seat = seats[seatKey];

        return (
          <motion.div key={seatKey} variants={itemVariants}>
            <SeatItem
              seatId={seatKey}
              isPending={seat?.isOccupied} // 🔥 from DB
              isSelected={selected.includes(seatKey)}
              onClick={() => toggleSeat(seatKey)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}