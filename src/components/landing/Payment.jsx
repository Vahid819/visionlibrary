"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAYMENT_METHODS = [
  { name: "UPI", icon: "🔷", desc: "GPay, PhonePe, Paytm", color: "blue" },
  { name: "Razorpay", icon: "⚡", desc: "Cards, Net Banking, Wallets", color: "teal" },
  { name: "Cash", icon: "💵", desc: "Manual entry & tracking", color: "green" },
  { name: "Bank Transfer", icon: "🏦", desc: "NEFT, RTGS, IMPS", color: "purple" },
];

const TRANSACTIONS = [
  { name: "Rahul Sharma", seat: "A1", amount: "₹499", status: "Paid", plan: "Monthly" },
  { name: "Priya Mehta", seat: "B3", amount: "₹149", status: "Pending", plan: "Weekly" },
  { name: "Amit Kumar", seat: "C6", amount: "₹3,999", status: "Paid", plan: "Yearly" },
  { name: "Sara Patel", seat: "A8", amount: "₹499", status: "Failed", plan: "Monthly" },
];

const statusColor = {
  Paid: "text-teal-400 bg-teal-400/10 border-teal-400/20",
  Pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Failed: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function Payment() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 24,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="payment" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — text */}
        <div>
          <p className="text-[11px] font-bold text-teal-400 tracking-[0.12em] uppercase mb-3">
            Payments
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black tracking-[-2px] leading-tight mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Every payment,
            <br />
            <span className="text-teal-400">tracked perfectly</span>
          </h2>
          <p className="text-[15px] text-white/35 leading-relaxed font-light mb-8 max-w-sm">
            Accept payments via UPI, cards, or cash. Every transaction is logged with status, plan, and member details.
          </p>

          {/* Payment methods */}
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m, i) => (
              <div
                key={m.name}
                ref={(el) => (cardsRef.current[i] = el)}
                className="flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-teal-400/20 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-lg flex-shrink-0 group-hover:border-teal-400/20 transition-colors">
                  {m.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{m.name}</div>
                  <div className="text-[11px] text-white/30 font-light">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-8">
            {[
              { val: "₹0", label: "Transaction fees" },
              { val: "Real-time", label: "Status updates" },
              { val: "CSV", label: "Export anytime" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-xl font-black text-teal-400"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {s.val}
                </div>
                <div className="text-[11px] text-white/30 font-light mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — transaction mock */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
            <div>
              <div
                className="text-sm font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Payment History
              </div>
              <div className="text-[11px] text-white/30 mt-0.5">This month</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-teal-400" style={{ fontFamily: "Syne, sans-serif" }}>
                ₹25,000
              </div>
              <div className="text-[11px] text-white/30">Total revenue</div>
            </div>
          </div>

          {/* Transactions */}
          <div className="divide-y divide-white/[0.03]">
            {TRANSACTIONS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.015] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-400/10 border border-teal-400/15 flex items-center justify-center text-xs font-bold text-teal-400">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/80">{t.name}</div>
                    <div className="text-[11px] text-white/25">
                      Seat {t.seat} · {t.plan}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white/70">{t.amount}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColor[t.status]}`}>
                    {t.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[11px] text-white/25">Showing recent transactions</span>
            <button className="text-[11px] text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Export CSV →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
