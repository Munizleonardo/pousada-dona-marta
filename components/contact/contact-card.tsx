"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { StaggerItem } from "@/components/motion/stagger-group";
import { TiltCard } from "@/components/motion/tilt-card";
import { useReliableInView } from "@/components/motion/use-reliable-in-view";

export function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const { ref, inView } = useReliableInView<HTMLSpanElement>({ once: true, amount: 0.6 });

  const inner = (
    <>
      <motion.span
        ref={ref}
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -90, opacity: 0 }}
        whileHover={{ scale: 1.15, rotate: 6 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
      >
        {icon}
      </motion.span>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
    </>
  );

  return (
    <StaggerItem depth>
      <TiltCard
        max={6}
        className="rounded-2xl border border-border bg-background p-6 transition-shadow duration-300 hover:shadow-xl"
      >
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex flex-col gap-4"
          >
            {inner}
          </a>
        ) : (
          <div className="flex flex-col gap-4">{inner}</div>
        )}
      </TiltCard>
    </StaggerItem>
  );
}
