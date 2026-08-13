"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function ParallaxScene({
  src,
  alt,
  className,
  strength = 60,
  priority = false,
  kenBurns = false,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  priority?: boolean;
  kenBurns?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y, scale }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          className={cn("object-cover", kenBurns && "animate-ken-burns")}
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}
