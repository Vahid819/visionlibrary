"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

import { SeatItem } from "./seat-item";

export function SeatGrid({ seats, onSelectStudent }) {
  const [seatData, setSeatData] = useState(seats);
  const [students, setStudents] = useState([]);

  const seatList = seatData?.data?.seat || [];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("/api/students");

        if (data.success) {
          setStudents(data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load students");
      }
    };

    fetchStudents();
  }, []);

  const handleSeatClick = (seat) => {
    if (!seat.isOccupied) return;

    const student = students.find(
      (s) => Number(s.seat) === Number(seat.seatNumber)
    );

    if (!student) {
      toast.error("Student not found");
      return;
    }

    onSelectStudent(student);
  };

  if (!seatList.length) {
    return (
      <p className="text-center text-muted-foreground">
        No seats found
      </p>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-8 gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {seatList.map((seat) => (
        <SeatItem
          key={seat.seatNumber}
          seatNumber={seat.seatNumber}
          isOccupied={seat.isOccupied}
          onClick={() => handleSeatClick(seat)}
        />
      ))}
    </motion.div>
  );
}