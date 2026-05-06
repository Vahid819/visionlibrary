"use client";

const STEPS = ["Personal Info", "Seat & Plan", "Review"];

export default function ProgressBar({ currentStep }) {
  const pct = ((currentStep) / STEPS.length) * 100;

  return (
    <div className="mb-7">
      <div className="flex justify-between mb-2">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`text-[11px] font-semibold tracking-widest uppercase transition-colors duration-300 ${
              i + 1 === currentStep ? "text-teal-400" : "text-[#6b7fa0]"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(45,212,191,0.5)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
