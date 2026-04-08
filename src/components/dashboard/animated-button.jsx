"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AnimatedButton({ label }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Button
        variant="outline"
        className="w-full justify-start hover:bg-primary/10 hover:text-primary transition"
      >
        {label}
      </Button>
    </motion.div>
  );
}