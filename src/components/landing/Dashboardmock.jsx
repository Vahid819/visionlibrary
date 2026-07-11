"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const SEATS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  state: [5, 12, 18, 23, 31].includes(i + 1)
    ? "selected"
    : [2, 7, 11, 15, 19, 24, 28, 33].includes(i + 1)
    ? "occupied"
    : "empty",
}));

const KPI = [
  { label: "Active", value: "87", color: "teal" },
  { label: "Today", value: "+5", color: "white" },
  { label: "Renewals", value: "12", color: "amber" },
  { label: "Revenue", value: "₹25K", color: "teal" },
];

export default function DashboardMock() {
  const scanRef = useRef(null);

  useEffect(() => {
    gsap.to(scanRef.current, {
      y: 380,
      duration: 2.8,
      repeat: -1,
      ease: "none",
      repeatDelay: 1.2,
    });
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_32px_80px_rgba(0,0,0,0.7)]">

      {/* Scan line */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
        <div
          ref={scanRef}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"
          style={{ top: -2 }}
        />
      </div>

      {/* Chrome bar */}
      <div className="bg-[#080e1d] px-4 py-3 flex items-center gap-2 border-b border-white/[0.04]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="ml-3 flex-1 bg-white/4 rounded px-3 py-1 text-[11px] text-white/20">
          visionlibrary.app/dashboard
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#050d1b] flex min-h-[340px]">

        {/* Sidebar */}
        <div className="w-36 border-r border-white/[0.04] p-3 flex-shrink-0">
          <div className="text-teal-400 text-[11px] font-black mb-0.5" style={{ fontFamily: "Syne, sans-serif" }}>
            Vision Library
          </div>
          <div className="text-white/15 text-[10px] mb-4">workspace</div>
          {["Home", "Payment", "Seat", "Message", "Reports", "Settings"].map((item, i) => (
            <div
              key={item}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] mb-0.5 ${
                i === 0 ? "bg-teal-400/10 text-teal-400" : "text-white/25"
              }`}
            >
              {["⊞", "💳", "🪑", "💬", "📊", "⚙️"][i]}
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 space-y-3">

          {/* KPIs */}
          <div className="grid grid-cols-4 gap-2">
            {KPI.map((k) => (
              <div key={k.label} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2.5">
                <div className="text-[10px] text-white/30 mb-1">{k.label}</div>
                <div
                  className={`text-lg font-black ${
                    k.color === "teal" ? "text-teal-400" : k.color === "amber" ? "text-amber-400" : "text-white"
                  }`}
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {k.value}
                </div>
              </div>
            ))}
          </div>

          {/* Seat map + activity */}
          <div className="grid grid-cols-[1fr_120px] gap-3">
            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
              <div className="text-[10px] text-white/40 font-semibold mb-2">Seat Map</div>
              <div className="grid grid-cols-10 gap-0.5">
                {SEATS.map((seat) => (
                  <div
                    key={seat.id}
                    className={`aspect-square rounded-[3px] flex items-center justify-center text-[6px] font-medium ${
                      seat.state === "selected"
                        ? "bg-teal-400 text-black"
                        : seat.state === "occupied"
                        ? "bg-teal-400/15 text-teal-400/60"
                        : "bg-white/[0.04] text-white/15"
                    }`}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
              <div className="text-[10px] text-white/40 font-semibold mb-2">Activity</div>
              <div className="space-y-2">
                {["Rahul N.", "Priya M.", "Amit K.", "Sara S."].map((name) => (
                  <div key={name} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-teal-400/15 flex items-center justify-center text-[8px] text-teal-400 flex-shrink-0">
                      {name[0]}
                    </div>
                    <div>
                      <div className="text-[9px] text-white/50">{name}</div>
                      <div className="text-[8px] text-white/20">just now</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
