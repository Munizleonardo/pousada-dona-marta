import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { PlaceCard } from "@/components/location/place-card";
import { MapEmbed } from "@/components/location/map-embed";
import { CtaBand } from "@/components/sections/cta-band";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { LOCATION_HERO_IMAGE } from "@/lib/constants";

type Place = { icon: string; name: string; distance: string; description: string };

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Location" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const places = t.raw("places") as Place[];

  return (
    <>
      <PageHero
        src={LOCATION_HERO_IMAGE}
        alt="Encontro do rio com o mar na região da Praia da Pinheira"
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
        meta={[
          { icon: "mapPin", label: tHero("distanceBadge") },
          { icon: "compass", label: t("pageHeroCount", { count: places.length }) },
        ]}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((place, index) => (
            <PlaceCard key={place.name} {...place} index={index} />
          ))}
        </StaggerGroup>

        <MapEmbed />
      </div>

      <CtaBand />
    </>
  );
}
