"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { IconBadge } from "@/components/motion/icon-badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { AccommodationGallery } from "@/components/accommodations/accommodation-gallery";
import { ICON_MAP } from "@/components/icon-map";
import type { ACCOMMODATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AccommodationSection({
  item,
  reversed = false,
}: {
  item: (typeof ACCOMMODATIONS)[number];
  reversed?: boolean;
}) {
  const t = useTranslations("Accommodations");
  const Icon = ICON_MAP[item.icon];
  const features = t.raw(`items.${item.id}.features`) as string[];

  return (
    <div
      className={cn(
        "flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16",
        reversed && "lg:flex-row-reverse"
      )}
    >
      <DepthReveal className="-mx-4 sm:-mx-6 lg:mx-0 lg:w-3/5">
        <AccommodationGallery images={item.gallery} alt={t(`items.${item.id}.name`)} />
      </DepthReveal>

      <div className="flex w-full flex-col gap-5 lg:w-2/5">
        <Reveal className="flex items-center gap-3">
          {Icon ? <IconBadge icon={Icon} size="sm" /> : null}
          <Badge variant="secondary">{t(`items.${item.id}.capacity`)}</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              <TextReveal>{t(`items.${item.id}.name`)}</TextReveal>
            </h2>
            <p className="mt-1 text-base font-medium text-primary/80">
              {t(`items.${item.id}.tagline`)}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t(`items.${item.id}.description`)}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-3 rounded-2xl border border-border p-5">
            <span className="text-sm font-semibold">{t("featuresTitle")}</span>
            <StaggerGroup className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {features.map((feature) => (
                <StaggerItem key={feature}>
                  <span className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {feature}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Button asChild size="lg" className="w-fit rounded-full px-7">
            <Link href={{ pathname: "/reservar", query: { acomodacao: item.id } }}>
              {t("reserveCta")}
            </Link>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
