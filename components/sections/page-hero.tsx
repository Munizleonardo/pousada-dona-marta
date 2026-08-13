"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Compass, Home, Mail, MapPin, Phone, Star } from "lucide-react";
import { TextReveal } from "@/components/motion/text-reveal";

const META_ICON_MAP = {
  star: Star,
  mapPin: MapPin,
  home: Home,
  compass: Compass,
  phone: Phone,
  mail: Mail,
} as const;

export type PageHeroMetaItem = { icon: keyof typeof META_ICON_MAP; label: string };

export function PageHero({
  src,
  alt,
  badge,
  title,
  subtitle,
  meta,
}: {
  src: string;
  alt: string;
  badge?: string;
  title: string;
  subtitle?: string;
  meta?: PageHeroMetaItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[56vh] min-h-[420px] w-full items-center overflow-hidden bg-neutral-900"
    >
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 h-full w-full">
        <Image src={src} alt={alt} fill priority quality={90} className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/50 to-black/35" />
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-12 pt-20 sm:px-6 lg:px-8"
      >
        {badge ? (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-fit rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm"
          >
            {badge}
          </motion.span>
        ) : null}
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl">
          <TextReveal delay={0.1} duration={0.8}>
            {title}
          </TextReveal>
        </h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {meta && meta.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
          >
            {meta.map((item, index) => {
              const Icon = META_ICON_MAP[item.icon];
              return (
                <Fragment key={item.label}>
                  {index > 0 ? (
                    <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" aria-hidden="true" />
                  ) : null}
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </span>
                </Fragment>
              );
            })}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
