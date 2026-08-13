"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { question: string; answer: string };

export function Faq() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="duvidas" className="scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <SectionEyebrow>{t("badge")}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            <TextReveal>{t("title")}</TextReveal>
          </h2>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground">{t("subtitle")}</p>
          </Reveal>
        </div>

        <StaggerGroup>
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-background px-6">
            {items.map((item, index) => (
              <StaggerItem key={item.question} className="not-last:border-b border-border">
                <AccordionItem value={`item-${index}`} className="border-b-0">
                  <AccordionTrigger className="py-4 text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerGroup>
      </div>
    </section>
  );
}
