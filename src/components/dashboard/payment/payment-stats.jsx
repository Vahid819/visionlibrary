"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, CreditCard, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function PaymentStats({ userdata, paymentplan, loading = false }) {
  // Calculate stats
  const users = Array.isArray(userdata?.data) ? userdata.data : [];
  const plans = Array.isArray(paymentplan?.data) ? paymentplan.data : [];

  const planPriceMap = plans.reduce((acc, plan) => {
    acc[plan.planName] = Number(plan.planAmount);
    return acc;
  }, {});
  const totalRevenue = users.reduce((sum, user) => {
    if (user.paymentStatus !== "Paid") return sum;

    return sum + (planPriceMap[user.plan] || 0);
  }, 0);
  const successful = users.filter(
    (user) => user.paymentStatus === "Paid",
  ).length;
  const pending = users.filter(
    (user) => user.paymentStatus === "Pending",
  ).length;
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: Wallet,
    },
    {
      title: "Successful",
      value: successful,
      icon: CreditCard,
    },
    {
      title: "Pending",
      value: pending,
      icon: AlertCircle,
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>

              <Skeleton className="h-12 w-12 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <motion.div
          key={item.title}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h2 className="mt-1 text-2xl font-bold">{item.value}</h2>
              </div>

              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
