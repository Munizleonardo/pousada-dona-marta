import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { ContactCard } from "@/components/contact/contact-card";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { MapEmbed } from "@/components/location/map-embed";
import { CtaBand } from "@/components/sections/cta-band";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { Button } from "@/components/ui/button";
import { CONTACT, CONTACT_HERO_IMAGE, MAP_DIRECTIONS_URL } from "@/lib/constants";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tWhatsapp = await getTranslations({ locale, namespace: "Reservation.whatsappMessage" });

  return (
    <>
      <PageHero
        src={CONTACT_HERO_IMAGE}
        alt="Fachada da Pousada Dona Marta"
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={<Phone className="size-5" />}
            title={t("phoneTitle")}
            value={CONTACT.phones.map((phone) => phone.display).join(" / ")}
            href={buildWhatsappUrl(tWhatsapp("greeting"))}
          />
          <ContactCard
            icon={<Mail className="size-5" />}
            title={t("emailTitle")}
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
          />
          <ContactCard
            icon={<MapPin className="size-5" />}
            title={t("addressTitle")}
            value={CONTACT.address}
            href={MAP_DIRECTIONS_URL}
          />
          <ContactCard
            icon={<InstagramIcon className="size-5" />}
            title={t("socialTitle")}
            value="@pousadadonamarta"
            href={CONTACT.instagram}
          />
        </StaggerGroup>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 flex-1 rounded-full text-base">
            <a href={buildWhatsappUrl(tWhatsapp("greeting"))} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-4" /> {t("whatsappCta")}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 flex-1 rounded-full text-base">
            <a href={`mailto:${CONTACT.email}`}>
              <Mail className="size-4" /> {t("emailCta")}
            </a>
          </Button>
        </div>

        <MapEmbed />
      </div>

      <CtaBand />
    </>
  );
}
