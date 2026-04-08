"use client";

import { useState } from "react";
import { SeatItem } from "./seat-item";

const totalSeats = 40;
const seatsPerRow = 8;

const occupiedSeats = [2, 3, 7, 15, 22];

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
    <div className="space-y-2">
      {Array.from({ length: Math.ceil(totalSeats / seatsPerRow) }).map(
        (_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
              const seatNumber = rowIndex * seatsPerRow + colIndex + 1;
              if (seatNumber > totalSeats) return null;

              return (
                <SeatItem
                  key={seatNumber}
                  seatId={seatNumber}
                  isOccupied={occupiedSeats.includes(seatNumber)}
                  isSelected={selected.includes(seatNumber)}
                  onClick={() => toggleSeat(seatNumber)}
                />
              );
            })}
          </div>
        )
      )}
    </div>
  );
}