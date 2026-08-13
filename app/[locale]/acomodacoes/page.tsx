import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { AccommodationSection } from "@/components/accommodations/accommodation-section";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Separator } from "@/components/ui/separator";
import { ACCOMMODATIONS, ACCOMMODATIONS_HERO_IMAGE } from "@/lib/constants";

export default async function AccommodationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Accommodations" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });

  return (
    <>
      <PageHero
        src={ACCOMMODATIONS_HERO_IMAGE}
        alt="Vista da Enseada da Pinheira"
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
        meta={[
          { icon: "home", label: t("pageHeroCount", { count: ACCOMMODATIONS.length }) },
          { icon: "star", label: tHero("superhostBadge") },
        ]}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {ACCOMMODATIONS.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-20">
            <AccommodationSection item={item} reversed={index % 2 === 1} />
            {index < ACCOMMODATIONS.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </div>

      <Faq />
      <CtaBand />
    </>
  );
}
