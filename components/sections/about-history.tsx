"use client";

import { useTranslations } from "next-intl";
import { Check, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { ParallaxScene } from "@/components/motion/parallax-scene";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ABOUT_IMAGE } from "@/lib/constants";

type Stat = { value: string; label: string };

export function AboutHistory() {
  const t = useTranslations("AboutPage");
  const checklist = t.raw("checklist") as string[];
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <DepthReveal className="relative -mx-4 aspect-[4/5] overflow-hidden rounded-none shadow-2xl shadow-black/10 sm:-mx-6 lg:mx-0 lg:w-3/5 lg:rounded-3xl">
          <ParallaxScene
            src={ABOUT_IMAGE}
            alt="Fachada da Pousada Dona Marta"
            className="absolute inset-0 h-full w-full"
            kenBurns
          />
        </DepthReveal>

        <div className="flex flex-col gap-6 lg:w-2/5">
          <SectionEyebrow>{t("historyBadge")}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <TextReveal>{t("historyTitle")}</TextReveal>
          </h2>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("historyParagraph1")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("historyParagraph2")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("historyParagraph3")}
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
            {checklist.map((item) => (
              <StaggerItem key={item}>
                <span className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {item}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08} spring>
                <div className="flex flex-col gap-1">
                  <AnimatedCounter
                    value={stat.value}
                    className="font-heading text-4xl font-semibold text-primary sm:text-5xl"
                  />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal spring>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-10 text-primary-foreground sm:px-12 sm:py-12">
          <Quote className="absolute -right-2 -top-2 size-28 text-primary-foreground/10" />
          <p className="relative max-w-2xl font-heading text-xl leading-relaxed italic sm:text-2xl">
            &ldquo;{t("quote")}&rdquo;
          </p>
          <div className="relative mt-6 flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarFallback className="bg-primary-foreground/15 text-primary-foreground">
                {t("quoteName").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{t("quoteName")}</span>
              <span className="text-xs uppercase tracking-wide text-primary-foreground/70">
                {t("quoteRole")}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
