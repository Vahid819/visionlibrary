"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SeatSelector({
  selectedSeat,
  onSelect,
  error,
}) {
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSeats = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const { data } = await axios.get("/api/setting/setas");

        if (!mounted) return;

        setSeatData(data?.data?.seat || []);
      } catch (err) {
        if (!mounted) return;

        if (err.response?.status === 404) {
          setSeatData([]);
        } else {
          setFetchError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load seats."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchSeats();

    return () => {
      mounted = false;
    };
  }, []);

  const totalSeats = seatData.length;

  const available = seatData.filter(
    (seat) => !seat.isOccupied
  ).length;

  const occupied = seatData.filter(
    (seat) => seat.isOccupied
  ).length;

  if (loading) {
    return (
      <div className="p-4 bg-[#0c1525] rounded-xl flex justify-center">
        Loading seats...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-4 text-red-500 text-sm">
        {fetchError}
      </div>
    );
  }

  if (!seatData.length) {
    return (
      <div className="p-4 text-center text-gray-400">
        No seats available.
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-4 mb-4 text-sm">
        <span>
          Available: <b>{available}</b>
        </span>

        <span>
          Occupied: <b>{occupied}</b>
        </span>

        <span>
          Total: <b>{totalSeats}</b>
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {seatData.map((seat) => {
          const isOccupied = seat.isOccupied;
          const isSelected =
            selectedSeat === seat.seatNumber;

          return (
            <button
              key={seat.seatNumber}
              type="button"
              disabled={isOccupied}
              onClick={() =>
                !isOccupied &&
                onSelect(
                  isSelected
                    ? null
                    : seat.seatNumber
                )
              }
              className={`aspect-square rounded-md border text-xs transition ${
                isSelected
                  ? "bg-teal-500 text-black border-teal-500"
                  : isOccupied
                  ? "bg-red-500/20 border-red-500 text-red-400 cursor-not-allowed"
                  : "bg-white/5 border-white/10 hover:border-teal-400 hover:text-teal-400"
              }`}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>

      <div className="flex gap-5 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white/10 rounded" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-500 rounded" />
          Selected
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          Occupied
        </div>
      </div>

      <div className="mt-4 text-sm">
        Selected:{" "}
        <strong>
          {selectedSeat
            ? `Seat ${selectedSeat}`
            : "None"}
        </strong>

        {selectedSeat && (
          <button
            className="ml-3 text-red-500"
            onClick={() => onSelect(null)}
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">
          {error}
        </p>
      )}
    </div>
  );
}