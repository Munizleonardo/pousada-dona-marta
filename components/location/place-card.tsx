"use client";

import { ICON_MAP } from "@/components/icon-map";
import { StaggerItem } from "@/components/motion/stagger-group";
import { TiltCard } from "@/components/motion/tilt-card";
import { FeatureIcon } from "@/components/motion/feature-icon";

export function PlaceCard({
  icon,
  name,
  distance,
  description,
  index = 0,
}: {
  icon: string;
  name: string;
  distance: string;
  description: string;
  index?: number;
}) {
  const Icon = ICON_MAP[icon];

  return (
    <StaggerItem depth>
      <TiltCard
        max={6}
        className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="flex items-center justify-between">
          {Icon ? <FeatureIcon icon={Icon} index={index} size="sm" /> : null}
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {distance}
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-lg font-semibold">{name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </TiltCard>
    </StaggerItem>
  );
}
