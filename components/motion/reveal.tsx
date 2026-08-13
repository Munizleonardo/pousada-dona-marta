"use client";

import { motion, type Variants } from "framer-motion";
import { useReliableInView } from "@/components/motion/use-reliable-in-view";

type Direction = "up" | "down" | "left" | "right" | "none";

const distance = 48;

function getOffset(direction: Direction) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.3,
  blur = false,
  spring = false,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  blur?: boolean;
  spring?: boolean;
}) {
  const { ref, inView } = useReliableInView<HTMLDivElement>({ once, amount });
  const offset = getOffset(direction);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
      ...(blur ? { filter: "blur(10px)" } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(blur ? { filter: "blur(0px)" } : {}),
      transition: spring
        ? { type: "spring", stiffness: 260, damping: 22, delay }
        : { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
