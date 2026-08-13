"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReliableInView } from "@/components/motion/use-reliable-in-view";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useReliableInView<HTMLSpanElement>({ once: true, amount: 0.6 });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary",
        className
      )}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-6 origin-left bg-primary"
      />
      {children}
    </motion.span>
  );
}
