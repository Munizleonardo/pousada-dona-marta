import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { CONTACT } from "@/lib/constants";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export async function ReservationSidebar() {
  const t = await getTranslations("Reservation.sidebar");
  const tWhatsapp = await getTranslations("Reservation.whatsappMessage");

  return (
    <div className="flex h-fit flex-col gap-6 rounded-3xl border border-border bg-muted/30 p-8">
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-semibold">{t("title")}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button asChild className="w-full justify-start gap-2" variant="secondary">
          <a href={buildWhatsappUrl(tWhatsapp("greeting"))} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon className="size-4" /> {CONTACT.phones[0].display}
          </a>
        </Button>
        <Button asChild className="w-full justify-start gap-2" variant="secondary">
          <a href={`mailto:${CONTACT.email}`}>
            <Mail className="size-4" /> {CONTACT.email}
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{t("responseTime")}</p>
    </div>
  );
}
