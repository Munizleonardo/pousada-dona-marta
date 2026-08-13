"use client";

import { motion, type Variants } from "framer-motion";
import { useReliableInView } from "@/components/motion/use-reliable-in-view";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerItemDepthVariants: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.82, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StaggerGroup({
  children,
  className,
  once = true,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const { ref, inView } = useReliableInView<HTMLDivElement>({ once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  depth = false,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={depth ? staggerItemDepthVariants : staggerItemVariants}
    >
      {children}
    </motion.div>
  );
}
