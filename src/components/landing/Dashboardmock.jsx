"use client";

import { motion } from "framer-motion";

const SEATS = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  state: [5, 12, 18, 23, 31, 36, 42].includes(i + 1)
    ? "selected"
    : [2, 7, 11, 15, 19, 24, 28, 33, 37, 41, 45, 50].includes(i + 1)
    ? "occupied"
    : "empty",
}));

const KPI_CARDS = [
  { label: "Total Active", value: "87", color: "teal" },
  { label: "New Joins Today", value: "5", color: "default" },
  { label: "Upcoming Renewals", value: "12", color: "amber" },
  { label: "Revenue", value: "₹25K", color: "teal" },
];

const SIDEBAR_ITEMS = [
  { icon: "⊞", label: "Home", active: true },
  { icon: "💳", label: "Payment", active: false },
  { icon: "🪑", label: "Seat", active: false },
  { icon: "💬", label: "Message", active: false },
  { icon: "📊", label: "Reports", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

export default function DashboardMock() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-teal-400/20 shadow-2xl shadow-black/60">

      {/* Scan line animation */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-teal-400/60 to-transparent"
          animate={{ y: [-10, 440] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        />
      </div>

      {/* Browser chrome */}
      <div className="bg-[#0a1628] px-4 py-3 flex items-center gap-2 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <div className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-white/30">
          visionlibrary.app/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div className="bg-[#060f1e] grid grid-cols-[160px_1fr] min-h-95">

        {/* Sidebar */}
        <div className="bg-black/20 p-4 border-r border-white/5">
          <div
            className="text-teal-400 font-black text-sm mb-1"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Vision Library
          </div>
          <div className="text-white/20 text-xs mb-5">Switch workspace</div>
          <div className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                  item.active
                    ? "bg-teal-400/10 text-teal-400"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-teal-400/20 flex items-center justify-center text-xs text-teal-400">
              V
            </div>
            <div>
              <div className="text-xs text-white/50 font-medium">Account</div>
              <div className="text-xs text-white/20">advanced settings</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-5 space-y-4">

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3">
            {KPI_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-white/3 border border-white/5 rounded-lg p-3"
              >
                <div className="text-xs text-white/40 mb-1.5">{card.label}</div>
                <div
                  className={`font-black text-xl ${
                    card.color === "teal"
                      ? "text-teal-400"
                      : card.color === "amber"
                      ? "text-amber-400"
                      : "text-white"
                  }`}
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* Seat map + recent activity */}
          <div className="grid grid-cols-[1fr_140px] gap-3">

            {/* Seat map */}
            <div className="bg-white/3 border border-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white/60">Seat Map</span>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-white/10" /> Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-teal-400" /> Selected
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-10 gap-1">
                {SEATS.map((seat) => (
                  <div
                    key={seat.id}
                    className={`aspect-square rounded-sm flex items-center justify-center text-[7px] font-medium transition-all ${
                      seat.state === "selected"
                        ? "bg-teal-400 text-black"
                        : seat.state === "occupied"
                        ? "bg-teal-400/20 border border-teal-400/30 text-teal-400"
                        : "bg-white/5 border border-white/8 text-white/20"
                    }`}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white/3 border border-white/5 rounded-lg p-3">
              <div className="text-xs font-semibold text-white/60 mb-3">Recent Activity</div>
              <div className="space-y-2">
                {["Rahul Nama", "Maks Sam", "Expiring Member", "Serica Nscion"].map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-teal-400/20 flex-shrink-0 flex items-center justify-center text-xs text-teal-400">
                      {name[0]}
                    </div>
                    <div>
                      <div className="text-xs text-white/60 leading-none">{name}</div>
                      <div className="text-xs text-white/20 mt-0.5">3 months ago</div>
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