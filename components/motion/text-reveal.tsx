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
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  /** Animate on mount instead of on viewport entry — use for above-the-fold text. */
  immediate?: boolean;
}) {
  const trigger = immediate
    ? { animate: { y: "0%" } }
    : { whileInView: { y: "0%" }, viewport: { once, amount } };

  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        {...trigger}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
