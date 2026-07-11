"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = ["Features", "How it Works", "Pricing", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#020917]/80 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <span className="text-black text-xs font-black">V</span>
          </div>
          <span
            className="text-white font-black text-base tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Vision Library
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="px-4 py-2 text-sm text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 text-sm font-semibold bg-teal-400 hover:bg-teal-300 text-black rounded-lg transition-all duration-200 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-px"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-white/60 hover:text-white p-1"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060f1e]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1"
          >
            {LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-white/60 hover:text-teal-400 transition-colors"
              >
                {l}
              </a>
            ))}
            <Link
              href="/auth/signup"
              className="mt-3 block text-center py-2.5 bg-teal-400 text-black text-sm font-bold rounded-lg"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
