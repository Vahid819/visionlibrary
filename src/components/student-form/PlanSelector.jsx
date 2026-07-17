"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PlanSelector({
  selectedPlan,
  onSelect,
  error,
}) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axios.get(
          "/api/setting/payment-plan"
        );
        if (data.success) {
          setPlans(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-sm text-muted-foreground py-6">
        Loading plans...
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-6">
        No plans available
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.planName;

          return (
            <button
              key={plan._id}
              type="button"
              onClick={() => onSelect(plan.planName)}
              className={`rounded-xl border p-4 text-center transition-all duration-200 ${
                isSelected
                  ? "border-teal-400 bg-teal-400/10 shadow-[0_0_16px_rgba(45,212,191,0.1)]"
                  : "border-white/10 bg-[#0c1525] hover:border-teal-400/30 hover:bg-teal-400/5"
              }`}
            >
              <div className="text-2xl mb-2">
                {plan.planName === "Weekly"
                  ? "📅"
                  : plan.planName === "Monthly"
                  ? "⚡"
                  : plan.planName === "Yearly"
                  ? "🏆"
                  : "📦"}
              </div>

              <h3
                className={`font-semibold ${
                  isSelected
                    ? "text-teal-400"
                    : "text-foreground"
                }`}
              >
                {plan.planName}
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                ₹{plan.planAmount}
              </p>

              <p className="text-xs text-muted-foreground">
                {plan.totalPlan} Days
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}