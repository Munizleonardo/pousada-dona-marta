"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONES = [
  "from-primary/25 via-primary/10 to-transparent text-primary",
  "from-sky-400/25 via-sky-400/10 to-transparent text-sky-600 dark:text-sky-400",
  "from-amber-400/25 via-amber-400/10 to-transparent text-amber-600 dark:text-amber-400",
  "from-rose-400/25 via-rose-400/10 to-transparent text-rose-600 dark:text-rose-400",
  "from-teal-400/25 via-teal-400/10 to-transparent text-teal-600 dark:text-teal-400",
  "from-violet-400/25 via-violet-400/10 to-transparent text-violet-600 dark:text-violet-400",
] as const;

const SIZE_CLASSES = {
  sm: "size-12",
  md: "size-16",
} as const;

const ICON_SIZE_CLASSES = {
  sm: "size-6",
  md: "size-7",
} as const;

export function FeatureIcon({
  icon: Icon,
  index = 0,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  index?: number;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  const tone = TONES[index % TONES.length];

  return (
    <motion.span
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      whileHover={{ scale: 1.08, rotate: 4 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm ring-1 ring-inset ring-black/[0.04]",
        SIZE_CLASSES[size],
        tone,
        className
      )}
    >
      <span
        aria-hidden
        className="absolute -right-3 -top-3 size-8 rounded-full bg-white/50 blur-md dark:bg-white/10"
      />
      <Icon className={cn(ICON_SIZE_CLASSES[size], "relative")} strokeWidth={1.75} />
    </motion.span>
  );
}
