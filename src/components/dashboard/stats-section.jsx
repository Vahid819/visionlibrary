"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Armchair, CheckCircle, Wallet } from "lucide-react";
import { StatCard } from "./stat-card";

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
        const { data: result } = await axios.get("/api/setting/get");

        const seats = result?.data || {};
        const seatData = seats.seat || {};

        const totalRows = Number(seats.row) || 0;
        const totalCols = Number(seats.column) || 0;
        const total = totalRows * totalCols;

        const occupied = Object.values(seatData).filter(
          (seat) =>
            seat.isAvailable === false ||
            seat.isAvailable === "false" ||
            seat.isAvailable === 0
        ).length;

        const available = Math.max(0, total - occupied);
        const revenue = occupied * 500;

        setStats([
          { title: "Total Seats", value: total.toString(), icon: Users },
          { title: "Occupied", value: occupied.toString(), icon: Armchair },
          { title: "Available", value: available.toString(), icon: CheckCircle },
          {
            title: "Revenue",
            value: `₹${revenue.toLocaleString("en-IN")}`,
            icon: Wallet,
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);

        if (axios.isAxiosError(error)) {
          console.log("Status:", error.response?.status);
          console.log("Data:", error.response?.data);
        }
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