"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "./animated-button";

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <AnimatedButton label="Add Booking" />
          <AnimatedButton label="Manage Seats" />
          <AnimatedButton label="View Payments" />
        </CardContent>
      </Card>
    </motion.div>
  );
}