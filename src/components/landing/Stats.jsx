"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { num: 87, prefix: "", suffix: "+", label: "Active members" },
  { num: 25, prefix: "₹", suffix: "K+", label: "Revenue tracked" },
  { num: 60, prefix: "", suffix: "", label: "Seats managed" },
  { num: 500, prefix: "", suffix: "+", label: "Happy users" },
];

function CountUp({ target, prefix = "", suffix = "", inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1600;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{prefix}{count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.06] rounded-2xl overflow-hidden">
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`p-8 text-center ${i < 3 ? "border-r border-white/[0.04]" : ""}`}
          >
            <div
              className="text-4xl font-black text-teal-400 mb-1.5"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <CountUp {...s} inView={inView} />
            </div>
            <div className="text-[12px] text-white/30 font-light">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
