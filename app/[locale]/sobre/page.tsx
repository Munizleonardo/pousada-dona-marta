import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { AboutHistory } from "@/components/sections/about-history";
import { AboutPurpose } from "@/components/sections/about-purpose";
import { CtaBand } from "@/components/sections/cta-band";
import { ABOUT_HERO_IMAGE } from "@/lib/constants";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return (
    <>
      <PageHero
        src={ABOUT_HERO_IMAGE}
        alt="Praia da Pinheira vista da enseada, ao entardecer"
        badge={t("heroBadge")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
      />

      <AboutHistory />
      <AboutPurpose />
      <CtaBand />
    </>
  );
}
