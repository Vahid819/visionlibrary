"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingItem } from "./booking-item";

export function RecentBookings() {
  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <BookingItem name="Rahul" seat="A12" time="10:00 AM" />
          <BookingItem name="Sneha" seat="B05" time="11:30 AM" />
          <BookingItem name="Amit" seat="C08" time="01:00 PM" />
        </CardContent>
      </Card>
    </motion.div>
  );
}