"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { ParallaxScene } from "@/components/motion/parallax-scene";
import { LOCATION_IMAGE } from "@/lib/constants";

export function LocationPreview() {
  const t = useTranslations("Location");

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-24 sm:px-6 lg:flex-row-reverse lg:items-center lg:gap-20 lg:px-8 lg:py-32">
      <DepthReveal className="relative -mx-4 aspect-[4/5] overflow-hidden rounded-none sm:-mx-6 lg:mx-0 lg:w-3/5 lg:rounded-3xl">
        <ParallaxScene
          src={LOCATION_IMAGE}
          alt="Trilha ecológica na região da Praia da Pinheira"
          className="absolute inset-0 h-full w-full"
          kenBurns
        />
      </DepthReveal>
      <div className="flex flex-col gap-6 lg:w-2/5">
        <SectionEyebrow>{t("badge")}</SectionEyebrow>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <TextReveal>{t("title")}</TextReveal>
        </h2>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Button asChild size="lg" className="w-fit rounded-full px-7">
            <Link href="/localizacao">
              {t("directionsCta")}
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
