"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🪑",
    title: "Smart seat management",
    desc: "Interactive seat map with live occupancy. Assign and manage seats in one click.",
    tag: "Core",
  },
  {
    icon: "💳",
    title: "Payment tracking",
    desc: "Track paid, pending, and failed payments. Export reports anytime.",
    tag: "Payments",
  },
  {
    icon: "💬",
    title: "WhatsApp messaging",
    desc: "Broadcast messages to members instantly. Send renewal reminders automatically.",
    tag: "Messaging",
  },
  {
    icon: "📊",
    title: "Revenue analytics",
    desc: "Daily, weekly, monthly revenue charts. Know exactly how your business performs.",
    tag: "Analytics",
  },
  {
    icon: "🔔",
    title: "Expiry alerts",
    desc: "Auto-notify members before their membership expires. Zero manual work.",
    tag: "Automation",
  },
  {
    icon: "⚙️",
    title: "Full configuration",
    desc: "Set rows, columns, pricing, and shifts. Fully customizable to your library.",
    tag: "Settings",
  },
];

export default function Features() {
  const headRef = useRef(null);

  useEffect(() => {
    gsap.from(headRef.current, {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">

      {/* Header */}
      <div ref={headRef} className="mb-14">
        <p className="text-[11px] font-bold text-teal-400 tracking-[0.12em] uppercase mb-3">
          Features
        </p>
        <h2
          className="text-4xl sm:text-5xl font-black tracking-[-2px] leading-tight max-w-lg mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Everything a study room needs
        </h2>
        <p className="text-[15px] text-white/35 max-w-md leading-relaxed font-light">
          Built specifically for study room and library owners in India. No bloat, just what you need.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-teal-400/20 transition-all duration-300 overflow-hidden cursor-default"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg flex-shrink-0 group-hover:border-teal-400/20 transition-colors duration-300">
                {f.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold text-teal-400/60 tracking-widest uppercase">
                  {f.tag}
                </span>
                <h3
                  className="text-sm font-bold text-white mt-0.5 mb-1.5"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-[13px] text-white/35 leading-relaxed font-light">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
