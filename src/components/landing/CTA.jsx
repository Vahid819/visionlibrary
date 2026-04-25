"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl border border-teal-400/20 bg-[#060f1e] p-12 md:p-20 text-center overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-400/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-400/4 rounded-full blur-3xl pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,212,191,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative corner star */}
        <div className="absolute bottom-6 right-6 text-teal-400/20 text-5xl">✦</div>
        <div className="absolute top-6 left-6 text-teal-400/10 text-3xl">✦</div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-4"
          >
            Coming Soon
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Ready to manage your{" "}
            <span className="text-teal-400">study room smarter?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-base text-white/40 mb-10 font-light max-w-lg mx-auto"
          >
            Sleek dark mode design. Real-time availability. Join the waitlist and be
            first to know when we launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Email input + CTA */}
            <div className="flex w-full max-w-md bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none"
              />
              <button className="px-6 py-3.5 bg-teal-400 hover:bg-teal-300 text-black font-bold text-sm transition-colors whitespace-nowrap">
                Join Waitlist →
              </button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-xs text-white/20 mt-4"
          >
            No spam. We'll only email you when we launch. 🚀
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}