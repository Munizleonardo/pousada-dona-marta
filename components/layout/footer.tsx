import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { CONTACT } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <Image
              src="/images/logo.png"
              alt="Pousada Dona Marta"
              width={160}
              height={44}
              quality={90}
              className="h-12 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold">{t("linksTitle")}</span>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-foreground">
                  {tNav("home")}
                </Link>
                <Link href="/acomodacoes" className="transition-colors hover:text-foreground">
                  {tNav("accommodations")}
                </Link>
                <Link href="/localizacao" className="transition-colors hover:text-foreground">
                  {tNav("location")}
                </Link>
                <Link href="/reservar" className="transition-colors hover:text-foreground">
                  {tNav("bookNow")}
                </Link>
                <Link href="/contato" className="transition-colors hover:text-foreground">
                  {tNav("contact")}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold">{t("contactTitle")}</span>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a
                  href={`tel:+${CONTACT.phones[0].digits}`}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0" /> {CONTACT.phones[0].display}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0" /> {CONTACT.email}
                </a>
                <span className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" /> {CONTACT.address}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold">{t("followTitle")}</span>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <InstagramIcon className="size-4 shrink-0" /> {tCommon("instagram")}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Pousada Dona Marta. {t("rights")}
          </span>
          <span>{t("madeWith")}</span>
        </div>
      </div>
    </footer>
  );
}
