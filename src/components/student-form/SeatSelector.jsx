"use client";

const OCCUPIED_SEATS = [3, 7, 12, 18, 22, 27, 31, 36, 40, 45];
const TOTAL_SEATS = 50;

export default function SeatSelector({ selectedSeat, onSelect, error }) {
  return (
    <div>
      <div className="grid grid-cols-10 gap-1 p-3 bg-[#0c1525] border border-white/7 rounded-xl">
        {Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1).map((num) => {
          const isOccupied = OCCUPIED_SEATS.includes(num);
          const isSelected = selectedSeat === num;

          return (
            <button
              key={num}
              type="button"
              disabled={isOccupied}
              onClick={() => !isOccupied && onSelect(num)}
              className={`
                aspect-square rounded-md flex items-center justify-center text-[9px] font-medium
                transition-all duration-150 border
                ${isSelected
                  ? "bg-teal-400 border-teal-400 text-black font-bold scale-110"
                  : isOccupied
                  ? "bg-red-400/8 border-red-400/15 text-red-400/40 cursor-not-allowed"
                  : "bg-white/3 border-white/8 text-[#6b7fa0] hover:bg-teal-400/10 hover:border-teal-400/30 hover:text-teal-400 cursor-pointer"
                }
              `}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3">
        {[
          { color: "bg-white/5 border border-white/10", label: "Available" },
          { color: "bg-teal-400", label: "Selected" },
          { color: "bg-red-400/15 border border-red-400/20", label: "Occupied" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-[11px] text-[#6b7fa0]">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 text-xs text-[#6b7fa0]">
        Selected:{" "}
        <span className={`font-semibold ${selectedSeat ? "text-teal-400" : "text-[#6b7fa0]"}`}>
          {selectedSeat ? `Seat ${selectedSeat}` : "None"}
        </span>
      </div>

      {error && (
        <p className="text-[11px] text-red-400 mt-1.5">⚠ {error}</p>
      )}
    </div>
  );
}
