import React from 'react'
import SeatCard from "@/components/SeatCard";

const seats = [
  { id: 1, student: "Vahid", paymentStatus: "paid", isOverdue: false },
  { id: 2, student: "Rahul", paymentStatus: "due", isOverdue: true },
  { id: 3, student: null },
  { id: 4, student: "Aman", paymentStatus: "due", isOverdue: false },
];

function page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Seat Management</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {seats.map((seat) => (
          <SeatCard key={seat.id} seat={seat} />
        ))}
      </div>
    </div>
  )
}

export default page