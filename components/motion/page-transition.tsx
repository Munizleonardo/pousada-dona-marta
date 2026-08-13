"use client";

import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import { usePathname } from "@/i18n/navigation";

type TransitionVariant = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
};

const transitions: TransitionVariant[] = [
  {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },
  {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
  {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.03 },
  },
  {
    initial: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
    animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    exit: { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
  },
  {
    initial: { opacity: 0, filter: "blur(14px)", y: 16 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(14px)", y: -16 },
  },
];

// Each known route gets its own fixed transition, so navigating between
// any two pages always plays a different animation than the one before it.
const ROUTE_TRANSITION_INDEX: Record<string, number> = {
  "/": 0,
  "/acomodacoes": 1,
  "/localizacao": 2,
  "/reservar": 3,
  "/contato": 4,
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const variant = transitions[ROUTE_TRANSITION_INDEX[pathname] ?? 0];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
