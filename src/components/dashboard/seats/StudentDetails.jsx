"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function StudentDetails({
  student,
  onDelete,
  onUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState("Pending");

useEffect(() => {
  if (student) {
    setPaymentStatus(student.paymentStatus);
  }
}, [student]);

  if (!student) {
    return (
      <div className="rounded-xl border p-10 text-center text-muted-foreground">
        Select a seat to view student details.
      </div>
    );
  }

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `/api/students`,
        {
          paymentStatus,
          studentId: student._id
        }
      );

      if (data.success) {
        toast.success("Payment updated");

        setIsEditing(false);

        onUpdated?.({
          ...student,
          paymentStatus,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update payment"
      );
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Seat {student.seat}
        </h2>

        <span className="rounded-full bg-red-100 px-4 py-1 text-red-600 text-sm">
          Occupied
        </span>

      </div>

      {/* Details */}

      <div className="grid md:grid-cols-2 gap-5 text-sm">

        <p>
          <strong>Name:</strong>{" "}
          {student.firstName} {student.lastName}
        </p>

        <p>
          <strong>Phone:</strong> {student.phone}
        </p>

        <p>
          <strong>Email:</strong> {student.email}
        </p>

        <p>
          <strong>Plan:</strong> {student.plan}
        </p>

        <div className="flex items-center gap-3">

          <strong>Payment:</strong>

          {isEditing ? (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                >
                  {paymentStatus}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>

                <DropdownMenuItem
                  onClick={() =>
                    setPaymentStatus("Pending")
                  }
                >
                  Pending
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    setPaymentStatus("Paid")
                  }
                >
                  Paid
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          ) : (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {paymentStatus}
            </span>
          )}

        </div>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(student.joinDate).toLocaleDateString()}
        </p>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-2 mt-8">

        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button onClick={handleSave}>
              Save
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setPaymentStatus(student.paymentStatus);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </>
        )}

        <Button
          variant="destructive"
          onClick={() =>
            onDelete(
              student._id,
              student.seat
            )
          }
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>

      </div>
    </div>
  );
}