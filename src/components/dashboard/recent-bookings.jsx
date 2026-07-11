"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingItem } from "./booking-item";
import axios from "axios";

export function RecentBookings() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("/api/dashboard/recent-booking");

        if (data.success) {
          setStudents(data.data);
        }
      } catch (error) {
        console.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))
          ) : students.length ? (
            students
              .slice(0, 3)
              .map((student) => (
                <BookingItem
                  key={student._id}
                  name={`${student.firstName} ${student.lastName}`}
                  seat={student.seat}
                  date={student.createdAt}
                />
              ))
          ) : (
            <p className="text-center text-muted-foreground">
              No recent bookings found.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
