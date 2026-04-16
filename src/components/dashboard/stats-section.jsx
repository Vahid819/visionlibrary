"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatCard } from "./stat-card";
import { Users, Armchair, CheckCircle, Wallet } from "lucide-react";

export function StatsSection() {
  const [stats, setStats] = useState([
    { title: "Total Seats", value: "0", icon: Users },
    { title: "Occupied", value: "0", icon: Armchair },
    { title: "Available", value: "0", icon: CheckCircle },
    { title: "Revenue", value: "₹0", icon: Wallet },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/setting/get", {
          cache: "no-store",
        });

        const text = await res.text();
        const result = text ? JSON.parse(text) : {};

        const seats = result?.data || {};

        // 🔥 calculations
        const total = Object.keys(seats).length;

        const occupied = Object.values(seats).filter(
          (seat) => seat.isOccupied
        ).length;

        const available = total - occupied;

        // 💰 example revenue logic (₹50 per occupied seat)
        const revenue = occupied * 50;

        // ✅ update state
        setStats([
          { title: "Total Seats", value: total, icon: Users },
          { title: "Occupied", value: occupied, icon: Armchair },
          { title: "Available", value: available, icon: CheckCircle },
          { title: "Revenue", value: `₹${revenue}`, icon: Wallet },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

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