"use client";

import { useRouter } from "next/navigation";

const PLAN_PRICES = {
  Weekly: "₹149 / week",
  Monthly: "₹499 / month",
  Yearly: "₹3,999 / year",
};

export default function SuccessScreen({ form, onAddAnother }) {
  const router = useRouter();

  return (
    <div className="text-center py-14 px-6">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/25 flex items-center justify-center text-4xl mx-auto mb-5">
        🎉
      </div>

      <h2
        className="text-2xl font-black tracking-tight mb-2 text-[#f0f4f8]"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Student Registered!
      </h2>
      <p className="text-sm text-[#6b7fa0] font-light max-w-sm mx-auto mb-7 leading-relaxed">
        Successfully added to Vision Library. Their seat is now marked as occupied.
      </p>

      {/* Summary card */}
      <div className="bg-[#0c1525] border border-white/7 rounded-xl px-5 py-2 mb-6 text-left max-w-sm mx-auto">
        {[
          { label: "Student", value: `${form.firstName} ${form.lastName}` },
          { label: "Seat", value: `Seat ${form.seat}`, teal: true },
          { label: "Plan", value: `${form.plan} — ${PLAN_PRICES[form.plan]}`, teal: true },
          { label: "Join Date", value: form.joinDate },
          { label: "Status", value: "✅ Registered", green: true },
        ].map(({ label, value, teal, green }) => (
          <div
            key={label}
            className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0"
          >
            <span className="text-xs text-[#6b7fa0] font-light">{label}</span>
            <span
              className={`text-xs font-medium ${
                teal ? "text-teal-400" : green ? "text-green-400" : "text-[#f0f4f8]"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={onAddAnother}
          className="px-6 py-2.5 bg-teal-400 hover:bg-teal-300 text-black font-bold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-400/25 hover:-translate-y-0.5"
        >
          + Add Another Student
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2.5 bg-transparent border border-white/10 hover:border-white/20 text-[#6b7fa0] hover:text-[#f0f4f8] font-medium text-sm rounded-xl transition-all duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
