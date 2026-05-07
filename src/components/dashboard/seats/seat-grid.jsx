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
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seats array
  const seatList = seats?.seat || [];

  // Handle seat click
  const toggleSeat = (seat) => {
    // ❌ Block available seats
    if (seat?.isAvailable) return;

    // Toggle selected UI
    setSelected((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );

    // Toggle seat details card
    setSelectedSeats((prev) => {
      const alreadySelected = prev.find(
        (s) => s.seatNumber === seat.seatNumber
      );

      if (alreadySelected) {
        return prev.filter(
          (s) => s.seatNumber !== seat.seatNumber
        );
      }

      return [...prev, seat];
    });
  };

  // Empty state
  if (!seatList.length) {
    return (
      <p className="text-center text-muted-foreground">
        No seats found
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Seat Grid */}
      <motion.div
        className="grid grid-cols-8 gap-2 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {seatList.map((seat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
          >
            <SeatItem
              seatId={index}
              seatNumber={seat?.seatNumber || index + 1}
              isAvailable={seat?.isAvailable}
              isSelected={selected.includes(seat.seatNumber)}
              onClick={() => toggleSeat(seat)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Seat Details */}
      {selectedSeats.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedSeats.map((seat, index) => (
            <motion.div
              key={seat.seatNumber}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className="
                rounded-2xl
                border
                bg-card
                p-5
                shadow-lg
              "
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Seat {seat?.seatNumber}
                </h2>

                <span
                  className="
                    text-xs
                    px-2 py-1
                    rounded-full
                    bg-red-500/10
                    text-red-500
                  "
                >
                  Occupied
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">
                    Student Name:
                  </span>{" "}
                  {seat?.studentName || "N/A"}
                </p>

                <p>
                  <span className="font-medium">
                    Phone:
                  </span>{" "}
                  {seat?.phone || "N/A"}
                </p>

                <p>
                  <span className="font-medium">
                    Course:
                  </span>{" "}
                  {seat?.course || "N/A"}
                </p>

                <p>
                  <span className="font-medium">
                    Email:
                  </span>{" "}
                  {seat?.email || "N/A"}
                </p>

                <p>
                  <span className="font-medium">
                    Joined At:
                  </span>{" "}
                  {seat?.joinedAt || "N/A"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}