"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { ptBR as ptBRDateFns, es as esDateFns, enUS as enUSDateFns } from "date-fns/locale";
import { ptBR as ptBRPicker, es as esPicker, enUS as enUSPicker } from "react-day-picker/locale";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { reservationSchema, type ReservationFormValues } from "@/lib/reservation-schema";
import { ACCOMMODATIONS, CONTACT, type AccommodationId } from "@/lib/constants";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { submitReservation } from "@/lib/actions/reservation";
import { cn } from "@/lib/utils";

const DATE_FNS_LOCALES = { pt: ptBRDateFns, en: enUSDateFns, es: esDateFns };
const DAY_PICKER_LOCALES = { pt: ptBRPicker, en: enUSPicker, es: esPicker };

type DialogState = "idle" | "success" | "error";

export function ReservationForm({
  defaultAccommodation,
}: {
  defaultAccommodation?: AccommodationId;
}) {
  const t = useTranslations("Reservation.form");
  const tErrors = useTranslations("Reservation.form.errors");
  const tWhatsapp = useTranslations("Reservation.whatsappMessage");
  const tDialog = useTranslations("Reservation.dialog");
  const tAccommodations = useTranslations("Accommodations");
  const locale = useLocale();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogState, setDialogState] = useState<DialogState>("idle");

  const dateFnsLocale = DATE_FNS_LOCALES[locale as keyof typeof DATE_FNS_LOCALES] ?? ptBRDateFns;
  const dayPickerLocale =
    DAY_PICKER_LOCALES[locale as keyof typeof DAY_PICKER_LOCALES] ?? ptBRPicker;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      accommodation: (defaultAccommodation ?? "") as AccommodationId,
      guests: "2",
      dateRange: {},
      message: "",
    },
  });

  const guestOptions = useMemo(() => Array.from({ length: 10 }, (_, i) => i + 1), []);

  function buildMessage(values: ReservationFormValues) {
    const lines = [
      tWhatsapp("greeting"),
      "",
      `${tWhatsapp("name")}: ${values.name}`,
      `${tWhatsapp("accommodation")}: ${tAccommodations(`items.${values.accommodation}.name`)}`,
      `${tWhatsapp("guests")}: ${values.guests}`,
      `${tWhatsapp("checkIn")}: ${
        values.dateRange.from ? format(values.dateRange.from, "PPP", { locale: dateFnsLocale }) : "-"
      }`,
      `${tWhatsapp("checkOut")}: ${
        values.dateRange.to ? format(values.dateRange.to, "PPP", { locale: dateFnsLocale }) : "-"
      }`,
    ];

    if (values.message) {
      lines.push(`${tWhatsapp("notes")}: ${values.message}`);
    }

    lines.push(
      "",
      `${tWhatsapp("contact")}: ${values.phone}${values.email ? ` / ${values.email}` : ""}`
    );

    return lines.join("\n");
  }

  function onSubmitWhatsapp(values: ReservationFormValues) {
    window.open(buildWhatsappUrl(buildMessage(values)), "_blank", "noopener,noreferrer");
  }

  async function onSubmitReservation(values: ReservationFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitReservation(values);
      if (result.success) {
        reset();
        setDialogState("success");
      } else {
        setDialogState("error");
      }
    } catch {
      setDialogState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const dialogCopy = dialogState === "error" ? tDialog.raw("error") : tDialog.raw("success");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitReservation)} className="flex flex-col gap-8">
        <StaggerGroup>
          <FieldGroup className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <StaggerItem>
              <Field>
                <FieldLabel htmlFor="name">{t("nameLabel")}</FieldLabel>
                <Input
                  id="name"
                  placeholder={t("namePlaceholder")}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name ? <FieldError>{tErrors("required")}</FieldError> : null}
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field>
                <FieldLabel htmlFor="phone">{t("phoneLabel")}</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {errors.phone ? <FieldError>{tErrors("required")}</FieldError> : null}
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field>
                <FieldLabel htmlFor="email">{t("emailLabel")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email ? <FieldError>{tErrors("invalidEmail")}</FieldError> : null}
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field>
                <FieldLabel htmlFor="accommodation">{t("accommodationLabel")}</FieldLabel>
                <Controller
                  control={control}
                  name="accommodation"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="accommodation" className="w-full" aria-invalid={!!errors.accommodation}>
                        <SelectValue placeholder={t("accommodationPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCOMMODATIONS.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {tAccommodations(`items.${item.id}.name`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.accommodation ? <FieldError>{tErrors("required")}</FieldError> : null}
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field>
                <FieldLabel htmlFor="guests">{t("guestsLabel")}</FieldLabel>
                <Controller
                  control={control}
                  name="guests"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="guests" className="w-full">
                        <SelectValue placeholder={t("guestsPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {guestOptions.map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {t("guestsOption", { count: n })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </StaggerItem>

            <StaggerItem>
              <Field>
                <FieldLabel>{t("datesLabel")}</FieldLabel>
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          aria-invalid={!!errors.dateRange}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="size-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "PP", { locale: dateFnsLocale })} {t("datesTo")}{" "}
                                {format(field.value.to, "PP", { locale: dateFnsLocale })}
                              </>
                            ) : (
                              format(field.value.from, "PP", { locale: dateFnsLocale })
                            )
                          ) : (
                            <span>{t("datesPlaceholder")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={field.value as DateRange | undefined}
                          onSelect={field.onChange}
                          numberOfMonths={1}
                          disabled={{ before: new Date() }}
                          locale={dayPickerLocale}
                          className="sm:hidden"
                        />
                        <Calendar
                          mode="range"
                          selected={field.value as DateRange | undefined}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          disabled={{ before: new Date() }}
                          locale={dayPickerLocale}
                          className="hidden sm:block"
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.dateRange ? <FieldError>{tErrors("invalidDates")}</FieldError> : null}
              </Field>
            </StaggerItem>
          </FieldGroup>
        </StaggerGroup>

        <Reveal delay={0.1}>
          <Field>
            <FieldLabel htmlFor="message">{t("messageLabel")}</FieldLabel>
            <Textarea id="message" placeholder={t("messagePlaceholder")} rows={4} {...register("message")} />
          </Field>
        </Reveal>

        <Reveal delay={0.15} spring>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-full text-base"
            >
              {isSubmitting ? t("sending") : t("submit")}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 flex-1 rounded-full text-base"
              onClick={handleSubmit(onSubmitWhatsapp)}
            >
              {t("whatsappAlt")}
            </Button>
          </div>
        </Reveal>
      </form>

      <Dialog open={dialogState !== "idle"} onOpenChange={(open) => !open && setDialogState("idle")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogCopy.title}</DialogTitle>
            <DialogDescription>{dialogCopy.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button asChild variant="outline" className="gap-2">
              <a href={buildWhatsappUrl(tWhatsapp("greeting"))} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-4" />
                {dialogCopy.whatsapp}
              </a>
            </Button>
            <Button asChild className="gap-2">
              <a href={`tel:+${CONTACT.phones[0].digits}`}>
                <Phone className="size-4" />
                {dialogCopy.call}
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
