"use client";

import { useState } from "react";
import { SeatItem } from "./seat-item";

const totalSeats = 40;
const seatsPerRow = 10;

// demo occupied seats (numbers now)
const occupiedSeats = [2, 3, 7, 15, 22];

export function SeatGrid() {
  const [selected, setSelected] = useState([]);

  const toggleSeat = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return;

    setSelected((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  return (
    <div className="grid gap-3">
      {Array.from({ length: Math.ceil(totalSeats / seatsPerRow) }).map(
        (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {Array.from({ length: seatsPerRow }).map((_, colIndex) => {
              const seatNumber = rowIndex * seatsPerRow + colIndex + 1;

              if (seatNumber > totalSeats) return null;

              const isOccupied = occupiedSeats.includes(seatNumber);
              const isSelected = selected.includes(seatNumber);

              return (
                <SeatItem
                  key={seatNumber}
                  seatId={seatNumber}
                  isOccupied={isOccupied}
                  isSelected={isSelected}
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