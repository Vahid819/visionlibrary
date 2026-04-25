"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { num: 87, suffix: "+", label: "Active Members" },
  { num: 25, prefix: "₹", suffix: "K+", label: "Revenue Tracked" },
  { num: 60, suffix: "", label: "Seats Managed" },
  { num: 500, suffix: "+", label: "Happy Users" },
];

function CountUp({ target, prefix = "", suffix = "", inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/5 border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]"
      >
        {STATS.map((s, i) => (
          <div key={i} className="p-8 md:p-10 text-center">
            <div
              className="text-4xl md:text-5xl font-black text-teal-400 mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <CountUp
                target={s.num}
                prefix={s.prefix}
                suffix={s.suffix}
                inView={inView}
              />
            </div>
            <div className="text-sm text-white/40 font-light">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}