"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Sign up & configure",
    desc: "Create your account, set up your study room layout — rows, columns, pricing — in under 5 minutes.",
    icon: "⚙️",
  },
  {
    step: "02",
    title: "Add members & assign seats",
    desc: "Register members, assign seats from the interactive map, and track occupancy in real time.",
    icon: "🪑",
  },
  {
    step: "03",
    title: "Track payments",
    desc: "Record payments, mark as paid/pending/failed, and monitor your total revenue from the dashboard.",
    icon: "💳",
  },
  {
    step: "04",
    title: "Message & manage",
    desc: "Send WhatsApp messages to individual members or broadcast to all. Manage renewals and expiries automatically.",
    icon: "💬",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-3">
          How it works
        </p>
        <h2
          className="text-4xl sm:text-5xl font-black tracking-tighter mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Up and running in{" "}
          <span className="text-teal-400">minutes</span>
        </h2>
        <p className="text-base text-white/40 max-w-xl mx-auto font-light leading-relaxed">
          No complex setup. No technical knowledge required. Just sign up and start managing.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />

        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Step circle */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-[#060f1e] border border-teal-400/20 flex items-center justify-center text-2xl mb-0 relative z-10">
                {s.icon}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center text-black text-xs font-black z-20">
                {i + 1}
              </div>
            </div>

            <h3
              className="text-base font-bold text-white mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {s.title}
            </h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}