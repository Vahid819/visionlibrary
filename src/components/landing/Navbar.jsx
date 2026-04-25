"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = ["Features", "How it Works", "Pricing", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020917]/90 backdrop-blur-xl border-b border-teal-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-400/10 border border-teal-400/30 flex items-center justify-center">
            <span className="text-teal-400 text-sm font-black">V</span>
          </div>
          <span className="font-black text-lg tracking-tight text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            Vision Library
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-white/50 hover:text-teal-400 transition-colors duration-200 font-medium"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm font-bold px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-black rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
          >
            Get Early Access
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060f1e] border-t border-white/5 px-6 pb-6"
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="block py-3 text-sm text-white/60 hover:text-teal-400 border-b border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            ))}
            <Link
              href="/auth/signup"
              className="mt-4 block text-center text-sm font-bold px-5 py-3 bg-teal-400 text-black rounded-lg"
            >
              Get Early Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}