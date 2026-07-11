"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: "01", icon: "⚙️", title: "Set up your room", desc: "Configure rows, columns, and pricing in under 5 minutes." },
  { n: "02", icon: "🪑", title: "Add members", desc: "Register students, assign seats, and set their plan." },
  { n: "03", icon: "💳", title: "Track payments", desc: "Mark payments as paid, pending, or failed instantly." },
  { n: "04", icon: "💬", title: "Stay in touch", desc: "Send WhatsApp messages and renewal reminders automatically." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-[11px] font-bold text-teal-400 tracking-[0.12em] uppercase mb-3">
          How it works
        </p>
        <h2
          className="text-4xl sm:text-5xl font-black tracking-[-2px]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Up in{" "}
          <span className="text-teal-400">5 minutes</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connector */}
        <div className="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-teal-400/15 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-2xl">
                  {s.icon}
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-teal-400 flex items-center justify-center text-black text-[10px] font-black">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>
                {s.title}
              </h3>
              <p className="text-[13px] text-white/30 leading-relaxed font-light max-w-[180px]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
