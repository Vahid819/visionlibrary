"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ title, value, icon: Icon, trend }) {
  const isPositive = trend >= 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <Card className="relative overflow-hidden bg-background/60 backdrop-blur border hover:shadow-xl transition">
        
        {/* Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition" />

        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>

            {/* 🔥 Dynamic Trend */}
            <div
              className={`flex items-center gap-1 text-xs mt-1 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {trend}% 
            </div>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}