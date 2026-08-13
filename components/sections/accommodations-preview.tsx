"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { TiltCard } from "@/components/motion/tilt-card";
import { ACCOMMODATIONS } from "@/lib/constants";

export function AccommodationsPreview() {
  const t = useTranslations("Accommodations");

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <SectionEyebrow>{t("badge")}</SectionEyebrow>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <TextReveal>{t("title")}</TextReveal>
        </h2>
        <Reveal delay={0.1}>
          <p className="text-base text-muted-foreground">{t("subtitle")}</p>
        </Reveal>
      </div>

      <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {ACCOMMODATIONS.map((item) => (
          <StaggerItem key={item.id} depth>
            <TiltCard max={5} className="rounded-3xl">
              <Link
                href="/acomodacoes"
                className="group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <Image
                    src={item.cover}
                    alt={t(`items.${item.id}.name`)}
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                <div className="relative z-10 flex flex-col gap-2 p-6 text-white">
                  <span className="text-xs font-medium uppercase tracking-wide text-white/70">
                    {t(`items.${item.id}.capacity`)}
                  </span>
                  <h3 className="font-heading text-2xl font-semibold">
                    {t(`items.${item.id}.name`)}
                  </h3>
                  <p className="text-sm text-white/80">{t(`items.${item.id}.tagline`)}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium">
                    {t("cta")}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
