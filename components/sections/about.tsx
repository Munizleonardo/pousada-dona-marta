"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { ParallaxScene } from "@/components/motion/parallax-scene";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ABOUT_IMAGE } from "@/lib/constants";

type Stat = { value: string; label: string };

export function About() {
  const t = useTranslations("About");
  const stats = t.raw("stats") as Stat[];

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-24 sm:px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8 lg:py-32">
      <DepthReveal className="relative -mx-4 aspect-[4/5] overflow-hidden rounded-none shadow-2xl shadow-black/10 sm:-mx-6 lg:mx-0 lg:w-3/5 lg:rounded-3xl">
        <ParallaxScene
          src={ABOUT_IMAGE}
          alt="Fachada da Pousada Dona Marta"
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
            {t("paragraph1")}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("paragraph2")}
          </p>
        </Reveal>

        <div className="flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.2 + i * 0.08} spring>
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

        <Reveal delay={0.2 + stats.length * 0.08}>
          <Button asChild size="lg" className="mt-2 w-fit rounded-full px-7">
            <Link href="/sobre">{t("cta")}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
