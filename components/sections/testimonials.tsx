"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { SectionEyebrow } from "@/components/motion/section-eyebrow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Testimonial = { name: string; location: string; date?: string; rating: number; text: string };

export function Testimonials() {
  const t = useTranslations("Testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <SectionEyebrow>{t("badge")}</SectionEyebrow>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <TextReveal>{t("title")}</TextReveal>
          </h2>
          <Reveal delay={0.1}>
            <p className="text-base text-muted-foreground">{t("subtitle")}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full max-w-5xl">
            <CarouselContent className="-ml-4">
              {items.map((item) => (
                <CarouselItem
                  key={item.name}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col gap-4 px-6 py-3">
                      <div className="flex gap-0.5 text-amber-400">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                        &ldquo;{item.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <Avatar className="size-9">
                          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.location}
                            {item.date ? ` · ${item.date}` : ""}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex justify-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </Reveal>
        <p className="text-center text-xs text-muted-foreground">{t("sourceNotice")}</p>
      </div>
    </section>
  );
}
