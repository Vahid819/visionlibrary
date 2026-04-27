"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SeatItem } from "./seat-item";

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

  // console.log("Received seats prop:", seats);

  // ✅ use array directly
  const seatList = seats?.seat || [];

  const toggleSeat = (index) => {
    if (seatList[index]?.isOccupied) return;

    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((s) => s !== index)
        : [...prev, index]
    );
  };

  if (!seatList.length) {
    return <p className="text-center text-muted-foreground">No seats found</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-8 gap-2 justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {seatList.map((seat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <SeatItem
            seatId={index}
            seatNumber={seat.seatNumber || index + 1} // ✅ FIXED
            isPending={seat?.isOccupied}
            isSelected={selected.includes(index)}
            onClick={() => toggleSeat(index)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}