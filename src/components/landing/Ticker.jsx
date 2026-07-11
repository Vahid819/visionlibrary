"use client";

const ITEMS = [
  "🪑 Real-time seat map",
  "💳 UPI & Razorpay",
  "💬 WhatsApp messaging",
  "📊 Revenue analytics",
  "🔔 Renewal alerts",
  "⚙️ Full configuration",
  "🌙 Dark mode",
  "🚀 Instant setup",
  "📱 Mobile friendly",
  "🔐 Secure auth",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="py-4 border-y border-white/[0.04] overflow-hidden">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-[13px] text-white/25 font-medium">
            <span className="text-teal-400/50 text-[10px]">✦</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
