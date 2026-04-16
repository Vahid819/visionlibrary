"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  Armchair,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

const actions = [
  {
    label: "Add Booking",
    href: "/dashboard/settings",
    icon: PlusCircle,
    desc: "Create a new booking",
  },
  {
    label: "Manage Seats",
    href: "/dashboard/settings",
    icon: Armchair,
    desc: "View & edit seat layout",
  },
  {
    label: "View Payments",
    href: "/dashboard/payment",
    icon: CreditCard,
    desc: "Check transactions",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    desc: "System configuration",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Card className="bg-card/80 backdrop-blur-md border border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <Link key={index} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/40 hover:bg-muted/60 transition cursor-pointer"
                >
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {action.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {action.desc}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-muted-foreground text-xs">
                    →
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}