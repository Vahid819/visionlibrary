"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DashboardMock from "./Dashboardmock";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <motion.div {...fadeUp(0.1)} className="relative z-10 mb-7">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/20 bg-teal-400/5 text-teal-400 text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Study Room Management — Reimagined
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.2)}
        className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6 max-w-5xl"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Unlock Your{" "}
        <span className="text-teal-400 relative">
          Productivity
          <span
            className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
          />
        </span>
        <br />
        <span className="text-white/90">Study Room</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        {...fadeUp(0.3)}
        className="relative z-10 text-base sm:text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10 font-light"
      >
        The study room management system you've been waiting for.
        Real-time seats, payments, WhatsApp messaging — all in one sleek admin dashboard.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        {...fadeUp(0.4)}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-20"
      >
        <Link
          href="/auth/signup"
          className="px-8 py-3.5 bg-teal-400 hover:bg-teal-300 text-black font-bold text-sm rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
        >
          Get Early Access →
        </Link>
        <a
          href="#features"
          className="px-8 py-3.5 border border-white/10 hover:border-teal-400/40 text-white/70 hover:text-teal-400 font-medium text-sm rounded-xl transition-all duration-200 hover:bg-teal-400/5"
        >
          See Features
        </a>
      </motion.div>

      {/* Dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Glow under dashboard */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-teal-400/20 blur-3xl rounded-full pointer-events-none" />
        <DashboardMock />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}