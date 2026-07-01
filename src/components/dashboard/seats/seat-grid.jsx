"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SeatItem } from "./seat-item";

export function SeatGrid({ seats }) {
  const seatList = seats?.seat || [];

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");

        const result = await res.json();

        if (result.success) {
          setStudents(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchStudents();
  }, []);

  // Create a map for O(1) lookup
  const studentMap = useMemo(() => {
    return students.reduce((acc, student) => {
      if (student.seat && student.isActive) {
        acc[student.seat] = student;
      }
      return acc;
    }, {});
  }, [students]);

  const handleSeatClick = (seat) => {
    // Only occupied seats are clickable
    if (!seat.isOccupied) return;

    if (selectedSeat?.seatNumber === seat.seatNumber) {
      setSelectedSeat(null);
      return;
    }

    setSelectedSeat(seat);
  };

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
        className="grid grid-cols-8 gap-2"
        initial="hidden"
        animate="visible"
      >
        {seatList.map((seat) => (
          <SeatItem
            key={seat.seatNumber}
            seatNumber={seat.seatNumber}
            isOccupied={seat.isOccupied}
            isSelected={
              selectedSeat?.seatNumber === seat.seatNumber
            }
            onClick={() => handleSeatClick(seat)}
          />
        ))}
      </motion.div>

      {/* Student Card */}

      <AnimatePresence>

        {selectedSeat && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="rounded-xl border bg-card p-6 shadow"
          >
            {(() => {
              const student =
                studentMap[selectedSeat.seatNumber];

              return (
                <>
                  <div className="flex justify-between mb-5">

                    <h2 className="text-xl font-semibold">
                      Seat {selectedSeat.seatNumber}
                    </h2>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-red-600 text-sm">
                      Occupied
                    </span>

                  </div>

                  {student ? (
                    <div className="grid md:grid-cols-2 gap-4 text-sm">

                      <p>
                        <strong>Name:</strong>{" "}
                        {student.firstName} {student.lastName}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {student.phone}
                      </p>

                      <p>
                        <strong>Email:</strong>{" "}
                        {student.email}
                      </p>

                      <p>
                        <strong>Plan:</strong>{" "}
                        {student.plan}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span className="text-green-600">
                          Active
                        </span>
                      </p>

                      <p>
                        <strong>Joined:</strong>{" "}
                        {new Date(
                          student.joinDate
                        ).toLocaleDateString()}
                      </p>

                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No student assigned to this seat.
                    </p>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}