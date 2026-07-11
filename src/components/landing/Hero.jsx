"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import DashboardMock from "./DashboardMock";

export default function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    // GSAP floating glow animation
    gsap.to(glowRef.current, {
      scale: 1.15,
      opacity: 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* Central glow */}
      <div
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(45,212,191,0.08) 0%, transparent 70%)" }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 mb-6"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-400/15 bg-teal-400/5 text-teal-400/80 text-[11px] font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Now in beta — Study Room Management
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-[clamp(40px,7vw,80px)] font-black tracking-[-3px] leading-[0.95] mb-5 max-w-4xl"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        The smarter way to
        <br />
        <span className="text-teal-400">run your library</span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative z-10 text-[15px] text-white/40 max-w-lg leading-relaxed mb-8 font-light"
      >
        Seat booking, payment tracking, and WhatsApp messaging —
        all in one clean admin dashboard built for study room owners.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-16"
      >
        <Link
          href="/auth/signup"
          className="h-11 px-7 bg-teal-400 hover:bg-teal-300 text-black text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/25 hover:-translate-y-px flex items-center"
        >
          Start for free →
        </Link>
        <a
          href="#features"
          className="h-11 px-7 text-white/50 hover:text-white text-sm font-medium rounded-xl border border-white/8 hover:border-white/20 transition-all duration-200 flex items-center"
        >
          See how it works
        </a>
      </motion.div>

      {/* Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="absolute -bottom-8 inset-x-16 h-16 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
        <DashboardMock />
      </motion.div>
    </section>
  );
}
