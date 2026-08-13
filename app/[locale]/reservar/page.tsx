import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { ReservationForm } from "@/components/reservation/reservation-form";
import { ReservationSidebar } from "@/components/reservation/reservation-sidebar";
import { ACCOMMODATIONS, RESERVATION_HERO_IMAGE, type AccommodationId } from "@/lib/constants";

export default async function ReservationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ acomodacao?: string }>;
}) {
  const { locale } = await params;
  const { acomodacao } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Reservation" });

  const defaultAccommodation = ACCOMMODATIONS.some((item) => item.id === acomodacao)
    ? (acomodacao as AccommodationId)
    : undefined;

  return (
    <>
      <PageHero
        src={RESERVATION_HERO_IMAGE}
        alt="Vista da Praia da Pinheira"
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8 lg:py-32">
        <ReservationForm defaultAccommodation={defaultAccommodation} />
        <ReservationSidebar />
      </div>
    </>
  );
}
