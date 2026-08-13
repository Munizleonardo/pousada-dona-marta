"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { ParallaxScene } from "@/components/motion/parallax-scene";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { TiltCard } from "@/components/motion/tilt-card";
import { ABOUT_PURPOSE_IMAGE } from "@/lib/constants";

type Pillar = { title: string; text: string };

export function AboutPurpose() {
  const t = useTranslations("AboutPage");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section className="bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:gap-16">
          <DepthReveal className="relative -mx-4 aspect-[4/5] overflow-hidden rounded-none sm:-mx-6 lg:mx-0 lg:w-2/5 lg:rounded-3xl">
            <ParallaxScene
              src={ABOUT_PURPOSE_IMAGE}
              alt="Trilha ecológica na região da Praia da Pinheira"
              className="absolute inset-0 h-full w-full"
              kenBurns
            />
          </DepthReveal>

          <div className="flex flex-col gap-6 lg:w-3/5">
            <SectionEyebrow>{t("purposeBadge")}</SectionEyebrow>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <TextReveal>{t("purposeTitle")}</TextReveal>
            </h2>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {t("purposeParagraph")}
              </p>
            </Reveal>
            <Reveal delay={0.15} spring>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/reservar">{t("purposeCta")}</Link>
                </Button>
                <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Star className="size-4 fill-amber-400 text-amber-400" /> {t("superhostBadge")}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} depth>
              <TiltCard
                max={6}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-background p-6 transition-shadow duration-300 hover:shadow-xl"
              >
                <h3 className="font-heading text-lg font-semibold text-primary">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
