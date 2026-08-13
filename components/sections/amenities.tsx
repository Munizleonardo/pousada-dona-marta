"use client";

import { useTranslations } from "next-intl";
import { ICON_MAP } from "@/components/icon-map";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { TiltCard } from "@/components/motion/tilt-card";
import { FeatureIcon } from "@/components/motion/feature-icon";

type AmenityItem = { icon: string; title: string; description: string };

export function Amenities() {
  const t = useTranslations("Amenities");
  const items = t.raw("items") as AmenityItem[];

  return (
    <section className="bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <SectionEyebrow>{t("badge")}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <TextReveal>{t("title")}</TextReveal>
          </h2>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground">{t("subtitle")}</p>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <StaggerItem key={item.title} depth>
                <TiltCard
                  max={6}
                  className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition-shadow duration-300 hover:shadow-xl"
                >
                  {Icon ? <FeatureIcon icon={Icon} index={index} /> : null}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
