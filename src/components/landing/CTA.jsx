"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.from(boxRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div
        ref={boxRef}
        className="relative rounded-3xl border border-white/[0.07] bg-white/[0.015] p-12 md:p-20 text-center overflow-hidden"
      >
        {/* Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-teal-400/4 rounded-full blur-3xl pointer-events-none" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/15 bg-teal-400/5 text-teal-400/70 text-[10px] font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Coming Soon
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-3px] leading-[0.95] mb-4 max-w-2xl mx-auto"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Ready to take control
            <br />
            <span className="text-teal-400">of your library?</span>
          </h2>

          <p className="text-[15px] text-white/30 mb-8 font-light max-w-md mx-auto leading-relaxed">
            Join the waitlist. Be the first to know when Vision Library launches.
          </p>

          <div className="flex items-center justify-center gap-0 max-w-sm mx-auto bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none"
            />
            <button className="px-5 py-3 bg-teal-400 hover:bg-teal-300 text-black text-sm font-bold transition-colors whitespace-nowrap">
              Join →
            </button>
          </div>

          <p className="text-[11px] text-white/15 mt-3">
            No spam. Only the launch email.
          </p>
        </div>
      </div>
    </section>
  );
}
