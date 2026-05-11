"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatCard } from "./stat-card"; // Make sure this path is correct
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
        const seatData = seats.seat || {};

        // 🔥 FIX 1: Force row and column to be Numbers so multiplication never fails
        const totalRows = Number(seats.row) || 0;
        const totalCols = Number(seats.column) || 0;
        const total = totalRows * totalCols;

        // 🔥 FIX 2: Check for both boolean (false) and string ("false")
        const occupied = Object.values(seatData).filter(
          (seat) => seat.isAvailable === false || seat.isAvailable === "false" || seat.isAvailable === 0
        ).length;

        // 🔥 FIX 3: Prevent 'Available' from ever going into negative numbers
        const available = Math.max(0, total - occupied);

        // 💰 Revenue logic (₹500 per occupied seat)
        const revenue = occupied * 500;

        // ✅ Update state
        setStats([
          { title: "Total Seats", value: total.toString(), icon: Users },
          { title: "Occupied", value: occupied.toString(), icon: Armchair },
          { title: "Available", value: available.toString(), icon: CheckCircle },
          { title: "Revenue", value: `₹${revenue.toLocaleString('en-IN')}`, icon: Wallet },
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