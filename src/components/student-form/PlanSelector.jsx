"use client";

const PLANS = [
  { id: "Weekly", emoji: "📅", name: "Weekly", price: "₹149 / week" },
  { id: "Monthly", emoji: "⚡", name: "Monthly", price: "₹499 / month" },
  { id: "Yearly", emoji: "🏆", name: "Yearly", price: "₹3,999 / year" },
];

export default function PlanSelector({ selectedPlan, onSelect, error }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              className={`
                border rounded-xl p-4 text-center cursor-pointer transition-all duration-200
                ${isSelected
                  ? "border-teal-400 bg-teal-400/10 shadow-[0_0_16px_rgba(45,212,191,0.1)]"
                  : "border-white/7 bg-[#0c1525] hover:border-teal-400/30 hover:bg-teal-400/5"
                }
              `}
            >
              <div className="text-xl mb-2">{plan.emoji}</div>
              <div
                className={`text-xs font-bold mb-1 ${
                  isSelected ? "text-teal-400" : "text-[#f0f4f8]"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {plan.name}
              </div>
              <div className="text-[11px] text-[#6b7fa0] font-light">
                {plan.price}
              </div>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-[11px] text-red-400 mt-1.5">⚠ {error}</p>
      )}
    </div>
  );
}

export { PLANS };
