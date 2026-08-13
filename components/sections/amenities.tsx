"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { ParallaxScene } from "@/components/motion/parallax-scene";
import { AMENITIES_IMAGE } from "@/lib/constants";

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

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <DepthReveal className="relative -mx-4 aspect-[4/3] overflow-hidden rounded-none sm:-mx-6 lg:mx-0 lg:w-3/5 lg:rounded-3xl">
            <ParallaxScene
              src={AMENITIES_IMAGE}
              alt="Vista da Enseada da Pinheira ao redor da pousada"
              className="absolute inset-0 h-full w-full"
              kenBurns
            />
          </DepthReveal>

          <StaggerGroup className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:w-2/5">
            {items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
