"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { SeatItem } from "./seat-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";

export function SeatGrid({ seats, studentId }) {
  const router = useRouter();

  const [seatData, setSeatData] = useState(seats);
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const seatList = seatData?.seat || [];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("/api/students");
        console.log(data);
        if (data.success) {
          setStudents(data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load students");
      }
    };
    if (editStudent) {
      setEditStudent(editStudent);
    }

    fetchStudents();
  }, [editStudent]);

  const selectedStudent = useMemo(() => {
    if (!studentId) return null;

    return students.find(
      (student) => String(student._id) === String(studentId),
    );
  }, [students, studentId]);

  const handleSeatClick = (seat) => {
    if (!seat.isOccupied) return;

    const student = students.find(
      (s) => Number(s.seat) === Number(seat.seatNumber),
    );

    if (!student) {
      toast.error("Student not found");
      return;
    }

    router.push(`/dashboard/seat/${student._id}`);
  };

  const handleDeleteStudent = async (studentId, seatNumber) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const { data } = await axios.delete(`/api/students/id?id=${studentId}`);

      if (data.success) {
        toast.success("Student deleted successfully");

        setStudents((prev) =>
          prev.filter((student) => student._id !== studentId),
        );

        setSeatData((prev) => ({
          ...prev,
          seat: prev.seat.map((seat) =>
            Number(seat.seatNumber) === Number(seatNumber)
              ? {
                  ...seat,
                  isOccupied: false,
                }
              : seat,
          ),
        }));

        router.push("/dashboard/seat");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete student");
    }
  };

  if (!seatList.length) {
    return <p className="text-center text-muted-foreground">No seats found</p>;
  }

  return (
    <div className="space-y-6">
      {/* Seat Grid */}

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
            isSelected={
              Number(selectedStudent?.seat) === Number(seat.seatNumber)
            }
            onClick={() => handleSeatClick(seat)}
          />
        ))}
      </motion.div>

      {/* Student Details */}

      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="rounded-xl border bg-card p-6 shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Seat {selectedStudent.seat}
              </h2>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                Occupied
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedStudent.firstName}{" "}
                {selectedStudent.lastName}
              </p>

              <p>
                <strong>Phone:</strong> {selectedStudent.phone}
              </p>

              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>

              <p>
                <strong>Plan:</strong> {selectedStudent.plan}
              </p>

              <div className="flex items-center gap-3">
                <strong>Payment:</strong>

                {editStudent ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        {editStudent?.paymentStatus || "Pending"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        onClick={() =>
                          setEditStudent((prev) => ({
                            ...prev,
                            paymentStatus: "Pending",
                          }))
                        }
                      >
                        Pending
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          setEditStudent((prev) => ({
                            ...prev,
                            paymentStatus: "Paid",
                          }))
                        }
                      >
                        Paid
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      editStudent?.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {editStudent?.paymentStatus || selectedStudent.paymentStatus}
                  </span>
                )}
              </div>

              <p>
                <strong>Joined:</strong>{" "}
                {new Date(selectedStudent.joinDate).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setEditStudent(!editStudent)}
              >
                Edit
              </Button>
              {editStudent && (
                <Button
                  onClick={async () => {
                    console.log(data);
                    setEditStudent(false);
                  }}
                >
                  Save
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() =>
                  handleDeleteStudent(selectedStudent._id, selectedStudent.seat)
                }
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Student
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
