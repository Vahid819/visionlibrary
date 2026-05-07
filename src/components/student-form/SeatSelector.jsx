// components/student-form/SeatSelector.jsx
"use client";

import { useState, useEffect } from "react";

export default function SeatSelector({ selectedSeat, onSelect, error }) {
  const [seatData, setSeatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch("/api/setting/get");

        if (res.status === 404) {
          setSeatData({ seat: [], row: 0, column: 0 });
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch seats");

        const result = await res.json();
        setSeatData(result.data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, []);

  const getSeatInfo = (num) =>
    seatData?.seat?.find(s => s.seatNumber === String(num));

  const totalSeats = seatData?.seat?.length ?? 0;
  const row        = seatData?.row    ?? 0;
  const column     = seatData?.column ?? 0;
  const available  = seatData?.seat?.filter(s =>  s.isAvailable).length ?? 0;
  const occupied   = seatData?.seat?.filter(s => !s.isAvailable).length ?? 0;

  // ── Loading ────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="p-4 bg-[#0c1525] border border-white/7 rounded-xl flex items-center justify-center h-28">
      <div className="flex items-center gap-2 text-xs text-[#6b7fa0]">
        <span className="w-3.5 h-3.5 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
        Loading seats...
      </div>
    </div>
  );

  // ── Error ──────────────────────────────────────────────────────────────
  if (fetchError) return (
    <div className="p-4 bg-red-400/5 border border-red-400/20 rounded-xl text-red-400 text-xs text-center">
      ⚠ {fetchError}
    </div>
  );

  // ── No seats ───────────────────────────────────────────────────────────
  if (totalSeats === 0) return (
    <div className="p-4 bg-[#0c1525] border border-white/7 rounded-xl text-[#6b7fa0] text-xs text-center">
      No seats configured. Set up seating layout in Settings first.
    </div>
  );

  // ── Seat grid ──────────────────────────────────────────────────────────
  return (
    <div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-2 text-xs text-[#6b7fa0]">
        <span>Available: <strong className="text-teal-400">{available}</strong></span>
        <span>Occupied: <strong className="text-red-400">{occupied}</strong></span>
        <span>Total: <strong className="text-[#f0f4f8]">{totalSeats}</strong></span>
      </div>

      {/* Grid */}
      <div className="p-3 bg-[#0c1525] border border-white/7 rounded-xl space-y-1">

        {/* Column labels */}
        <div
          className="grid mb-1 pl-8"
          style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`, gap: "4px" }}
        >
          {Array.from({ length: column }, (_, c) => (
            <div key={c} className="text-center text-[9px] text-[#6b7fa0] font-semibold">
              {c + 1}
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: row }, (_, r) => (
          <div key={r} className="flex items-center gap-1">

            {/* Row label */}
            <span className="w-7 text-[9px] text-[#6b7fa0] font-semibold text-center flex-shrink-0">
              R{r + 1}
            </span>

            {/* Seats in this row */}
            <div
              className="grid flex-1"
              style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`, gap: "4px" }}
            >
              {Array.from({ length: column }, (_, c) => {
                const seatNum     = r * column + c + 1;
                const seatInfo    = getSeatInfo(seatNum);
                const isAvailable = seatInfo?.isAvailable ?? true;
                const isSelected  = selectedSeat === seatNum;

                return (
                  <button
                    key={seatNum}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => isAvailable && onSelect(isSelected ? null : seatNum)}
                    title={`Seat ${seatNum} — ${isAvailable ? "Available" : "Occupied"}`}
                    className={`
                      aspect-square rounded-md flex flex-col items-center justify-center
                      text-[9px] font-medium gap-0.5 border transition-all duration-150
                      ${isSelected
                        ? "bg-teal-400 border-teal-400 text-black font-bold scale-110 shadow-md shadow-teal-400/30"
                        : isAvailable
                        ? "bg-white/3 border-white/8 text-[#6b7fa0] hover:bg-teal-400/10 hover:border-teal-400/30 hover:text-teal-400 hover:scale-105 cursor-pointer"
                        : "bg-red-400/8 border-red-400/15 text-red-400/40 cursor-not-allowed"
                      }
                    `}
                  >
                    <span className="text-[11px] leading-none">
                      {isSelected ? "✓" : isAvailable ? "🪑" : "✕"}
                    </span>
                    <span>{seatNum}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3">
        {[
          { color: "bg-white/5 border border-white/10",    label: "Available" },
          { color: "bg-teal-400",                           label: "Selected"  },
          { color: "bg-red-400/15 border border-red-400/20", label: "Occupied" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-[11px] text-[#6b7fa0]">{label}</span>
          </div>
        ))}
      </div>

      {/* Selected display */}
      <div className="mt-2.5 text-xs text-[#6b7fa0]">
        Selected:{" "}
        <span className={`font-semibold ${selectedSeat ? "text-teal-400" : "text-[#6b7fa0]"}`}>
          {selectedSeat ? `Seat ${selectedSeat}` : "None"}
        </span>
        {selectedSeat && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="ml-2 text-[#6b7fa0] hover:text-red-400 transition-colors"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Validation error */}
      {error && (
        <p className="text-[11px] text-red-400 mt-1.5">⚠ {error}</p>
      )}
    </div>
  );
}