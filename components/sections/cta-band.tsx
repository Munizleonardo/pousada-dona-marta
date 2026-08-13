"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

export function CtaBand() {
  const t = useTranslations("Hero");
  const tReservation = useTranslations("Reservation");

  return (
    <section className="relative overflow-hidden bg-neutral-900 py-24 text-center text-white lg:py-32">
      <div
        aria-hidden
        className="animate-drift-gradient pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, color-mix(in oklch, var(--primary) 40%, transparent), transparent 55%), radial-gradient(circle at 80% 25%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(circle at 50% 100%, color-mix(in oklch, var(--primary) 30%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <TextReveal>{tReservation("title")}</TextReveal>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-white/75">{tReservation("subtitle")}</p>
        </Reveal>
        <Reveal delay={0.2} spring>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          >
            <Link href="/reservar">{t("ctaPrimary")}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
