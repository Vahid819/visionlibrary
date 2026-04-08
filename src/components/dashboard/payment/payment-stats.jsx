"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CreditCard, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { title: "Total Revenue", value: "₹25,000", icon: Wallet },
  { title: "Successful", value: "180", icon: CreditCard },
  { title: "Pending", value: "12", icon: AlertCircle },
];

export function PaymentStats() {
  return (
    <div className="flex gap-4 md:flex-wrap justify-around">
      {stats.map((item) => (
        <motion.div key={item.title} whileHover={{ scale: 1.03 }}>
          <Card className="p-4 flex justify-between items-center bg-background/60 backdrop-blur hover:shadow-lg transition-all">
            <div>
              <p className="text-xs text-muted-foreground text-center">{item.title}</p>
              <p className="text-xl font-semibold text-center tracking-tight">
                {item.value}
              </p>
            </div>

            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <item.icon size={18} />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
