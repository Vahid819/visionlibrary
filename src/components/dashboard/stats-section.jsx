"use client";

import { motion } from "framer-motion";
import { StatCard } from "./stat-card";
import { Users, Armchair, CheckCircle, Wallet } from "lucide-react";

const stats = [
  { title: "Total Seats", value: "120", icon: Users },
  { title: "Occupied", value: "85", icon: Armchair },
  { title: "Available", value: "35", icon: CheckCircle },
  { title: "Revenue", value: "₹4,500", icon: Wallet },
];

export function StatsSection() {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </motion.div>
  );
}