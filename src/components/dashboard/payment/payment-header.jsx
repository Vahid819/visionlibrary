"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function PaymentHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center md:flex-wrap justify-between"
    >
      <div>
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Track all transactions and revenue
        </p>
      </div>

      <Button variant="outline" className="gap-2">
        <Download size={16} />
        Export
      </Button>
    </motion.div>
  );
}