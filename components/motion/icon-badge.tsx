"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  sm: "size-11",
  md: "size-12",
  lg: "size-14",
} as const;

const ICON_SIZE_CLASSES = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
} as const;

export function IconBadge({
  icon: Icon,
  size = "md",
  delay = 0,
  className,
}: {
  icon: LucideIcon;
  size?: keyof typeof SIZE_CLASSES;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      whileHover={{ scale: 1.15, rotate: 6 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
      className={cn(
        "flex items-center justify-center rounded-xl bg-primary/10 text-primary",
        SIZE_CLASSES[size],
        className
      )}
    >
      <Icon className={ICON_SIZE_CLASSES[size]} />
    </motion.span>
  );
}
