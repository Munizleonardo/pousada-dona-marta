"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ParallaxScene } from "@/components/motion/parallax-scene";
import { TextReveal } from "@/components/motion/text-reveal";
import { HERO_IMAGE } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex h-[95svh] min-h-[640px] w-full items-center overflow-hidden bg-neutral-900">
      <motion.div
        initial={{ scale: 1.28, filter: "brightness(0.55) saturate(0.7)" }}
        animate={{ scale: 1, filter: "brightness(1) saturate(1)" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full"
      >
        <ParallaxScene
          src={HERO_IMAGE}
          alt="Praia da Pinheira vista da enseada, ao entardecer"
          className="h-full w-full"
          strength={90}
          priority
          kenBurns
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 pb-16 pt-24 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
            <MapPin className="size-3.5" /> {t("badge")}
          </span>
        </motion.div>

        <div className="flex flex-col gap-1 [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]">
          <h1 className="font-heading text-6xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            <TextReveal delay={0.28} duration={0.9}>
              {t("titleLine1")}
            </TextReveal>
          </h1>
          <h1 className="font-heading text-6xl font-semibold italic leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            <TextReveal delay={0.42} duration={0.9}>
              {t("titleLine2")}
            </TextReveal>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="max-w-lg text-base text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.76 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <Button asChild size="lg" className="h-12 rounded-full px-7 text-base">
            <Link href="/reservar">{t("ctaPrimary")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-white/50 bg-black/20 px-7 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
          >
            <Link href="/acomodacoes">{t("ctaSecondary")}</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Star className="size-4 fill-amber-400 text-amber-400" /> {t("superhostBadge")}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
          <span className="text-sm font-medium">{t("distanceBadge")}</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-white/90"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">{t("scrollHint")}</span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
