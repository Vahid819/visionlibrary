"use client";

const ITEMS = [
  "🪑 Real-time seat availability",
  "💳 Payment tracking",
  "💬 WhatsApp integration",
  "📊 Revenue analytics",
  "🔔 Renewal alerts",
  "⚙️ Admin control panel",
  "🌙 Dark mode first",
  "🚀 Instant deployment",
  "📱 Mobile friendly",
  "🔐 Secure auth",
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="py-5 border-y border-teal-400/10 bg-teal-400/2 overflow-hidden">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: "ticker 24s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm text-white/40 font-medium">
            <span className="text-teal-400 text-xs">✦</span>
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}