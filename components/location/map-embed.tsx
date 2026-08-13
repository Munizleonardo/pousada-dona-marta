"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DepthReveal } from "@/components/motion/depth-reveal";
import { CONTACT, MAP_DIRECTIONS_URL, MAP_EMBED_URL } from "@/lib/constants";

export function MapEmbed() {
  const t = useTranslations("Location");

  return (
    <DepthReveal className="flex flex-col gap-6 overflow-hidden rounded-3xl border border-border bg-background p-6">
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 size-4 shrink-0" />
        <span>{CONTACT.address}</span>
      </div>

      <iframe
        src={MAP_EMBED_URL}
        title="Mapa com a localização da Pousada Dona Marta"
        className="h-80 w-full rounded-2xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <Button asChild variant="outline" className="self-end">
        <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
          {t("directionsCta")}
        </a>
      </Button>
    </DepthReveal>
  );
}
