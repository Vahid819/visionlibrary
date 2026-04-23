"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Check } from "lucide-react";

// 🔥 Demo data (seat + student mapping)
const students = [
  { id: 1, name: "Rahul", phone: "919876543210", seat: "A1" },
  { id: 2, name: "Amit", phone: "919812345678", seat: "A2" },
  { id: 3, name: "Priya", phone: "919999888777", seat: "B1" },
];

export default function page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Message Students</h1>
      <div className="space-y-4"></div>
    </div>
  );
}
