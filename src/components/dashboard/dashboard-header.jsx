"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plus, Sparkles } from "lucide-react";

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        flex flex-col gap-5 rounded-3xl border
        bg-background/80 p-6 shadow-sm backdrop-blur
        md:flex-row md:items-center md:justify-between absolute md:static right-0
        
      "
    >
      {/* Left Content */}
      <div className="hidden md:block space-y-2">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-2xl bg-primary/10 text-primary
            "
          >
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="text-sm text-muted-foreground">
              Welcome back 👋
            </p>
          </div>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Manage your study room, students, payments,
          and seats from one modern dashboard.
        </p>
      </div>

      {/* Right Button */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <Button
          asChild
          size="lg"
          className="
            group relative overflow-hidden
            rounded-2xl px-6 py-6
            shadow-lg transition-all duration-300
            hover:shadow-primary/30
          "
        >
          <Link
            href="/dashboard/student"
            className="flex items-center gap-2"
          >
            {/* Hover Glow */}
            <span
              className="
                absolute inset-0 opacity-0
                bg-white/10 transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            <Plus
              className="
                relative z-10 h-5 w-5
                transition-transform duration-300
                group-hover:rotate-90
              "
            />

            <span className="relative z-10 font-medium hidden md:block">
              Add Student
            </span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}