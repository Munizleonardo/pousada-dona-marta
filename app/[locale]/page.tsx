import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Amenities } from "@/components/sections/amenities";
import { AccommodationsPreview } from "@/components/sections/accommodations-preview";
import { LocationPreview } from "@/components/sections/location-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Amenities />
      <AccommodationsPreview />
      <LocationPreview />
      <Testimonials />
      <CtaBand />
    </>
  );
}
