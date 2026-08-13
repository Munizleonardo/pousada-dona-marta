"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

export function LanguageSwitcher({ solid = true }: { solid?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");
  const [isPending, startTransition] = useTransition();

  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  function handleSelect(nextLocale: (typeof LOCALES)[number]["code"]) {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t("languageLabel")}
          disabled={isPending}
          className={cn(
            "gap-1.5",
            !solid && "text-white hover:bg-white/10 hover:text-white"
          )}
        >
          <Globe className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {current.code}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1">
        <div className="flex flex-col gap-0.5">
          {LOCALES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted",
                item.code === locale && "bg-muted font-medium"
              )}
            >
              <span className="text-base leading-none">{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
