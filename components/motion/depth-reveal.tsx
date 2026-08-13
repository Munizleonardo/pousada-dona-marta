"use client";

import { motion } from "framer-motion";
import { useReliableInView } from "@/components/motion/use-reliable-in-view";

export function DepthReveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const { ref, inView } = useReliableInView<HTMLDivElement>({ once, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.78, y: 90, filter: "blur(18px)" }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.78, y: 90, filter: "blur(18px)" }
      }
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
