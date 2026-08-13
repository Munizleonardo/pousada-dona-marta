"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  className,
  once = true,
  amount = 0.6,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once, amount }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
