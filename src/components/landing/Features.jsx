"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "💳",
    title: "Track All Transactions",
    desc: "Real-time payment tracking with Paid, Pending, and Failed status. Full revenue analytics and export functionality built in.",
    tag: "Payments",
  },
  {
    icon: "🪑",
    title: "Smart Seat Management",
    desc: "Interactive seat map with live availability updates. Assign, book, and manage seats with a single click from your dashboard.",
    tag: "Seats",
  },
  {
    icon: "💬",
    title: "WhatsApp Messaging",
    desc: "Broadcast messages directly to members by seat or user. Send reminders, payment alerts, and renewal notices instantly.",
    tag: "Messaging",
  },
  {
    icon: "📊",
    title: "Efficient Admin Dashboard",
    desc: "KPI overview, recent activity feed, expiring members — everything you need in one clean, fast, dark-mode dashboard.",
    tag: "Dashboard",
  },
  {
    icon: "🔔",
    title: "Expiry Alerts",
    desc: "Automatic notifications for upcoming renewals. Never let a membership slip through the cracks again with smart reminders.",
    tag: "Alerts",
  },
  {
    icon: "⚙️",
    title: "Full Configuration",
    desc: "Customize seating layout, payment methods, UPI settings, and security — complete admin control from the settings panel.",
    tag: "Settings",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-3">
          Everything you need
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-4 max-w-2xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Built for library{" "}
          <span className="text-teal-400">administrators</span>
        </h2>
        <p className="text-base text-white/40 max-w-xl leading-relaxed font-light">
          From seat booking to payment tracking, Vision Library gives you complete control
          over your study room in one dashboard.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="group relative bg-white/3 border border-white/5 rounded-2xl p-6 hover:border-teal-400/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-linear-to-br from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

            {/* Tag */}
            <span className="inline-block text-xs font-semibold text-teal-400/70 tracking-widest uppercase mb-4 px-2 py-1 bg-teal-400/5 rounded-md border border-teal-400/10">
              {f.tag}
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-teal-400/8 border border-teal-400/15 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>

            <h3
              className="text-lg font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {f.title}
            </h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}