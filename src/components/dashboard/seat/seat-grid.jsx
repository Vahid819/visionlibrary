"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeatItem } from "./seat-item";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export function SeatGrid({ seats }) {
  const [selected, setSelected] = useState([]);

  const seatList = seats?.seat || []

  const toggleSeat = (index) => {
    const seat = seatList[index];

    // 🚫 block if occupied
    if (seat?.isOccupied) return;

    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((s) => s !== index)
        : [...prev, index]
    );
  };

  // // console.log("Rendering SeatGrid with seats:", seats.seatNumber);
  return (
    <motion.div
      className="grid grid-cols-8 gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {seatList.map((seat, index) => {
        return (
          <motion.div key={index} variants={itemVariants}>
            <SeatItem
              seatId={index}
              seatNumber={seat?.seatNumber || index + 1}
              isOccupied={seat?.isOccupied} // ✅ PASS THIS
              isSelected={selected.includes(index)}
              onClick={() => toggleSeat(index)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}