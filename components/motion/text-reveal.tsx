"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReliableInView } from "@/components/motion/use-reliable-in-view";

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
  const { ref, inView } = useReliableInView<HTMLSpanElement>({ once, amount });

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: inView ? "0%" : "110%" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
