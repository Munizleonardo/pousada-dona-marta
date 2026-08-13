import { defineRouting } from "next-intl/routing";

export const locales = ["pt", "en", "es"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "pt";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/sobre": {
      pt: "/sobre",
      en: "/about",
      es: "/nosotros",
    },
    "/acomodacoes": {
      pt: "/acomodacoes",
      en: "/accommodations",
      es: "/alojamientos",
    },
    "/localizacao": {
      pt: "/localizacao",
      en: "/location",
      es: "/ubicacion",
    },
    "/reservar": {
      pt: "/reservar",
      en: "/book",
      es: "/reservar",
    },
    "/contato": {
      pt: "/contato",
      en: "/contact",
      es: "/contacto",
    },
  },
});
