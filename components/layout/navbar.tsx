"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/acomodacoes", key: "accommodations" },
  { href: "/localizacao", key: "location" },
  { href: "/contato", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      suppressHydrationWarning
      initial={{ y: -96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/60 via-black/25 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Pousada Dona Marta"
            width={160}
            height={44}
            priority
            quality={90}
            className={cn(
              "h-10 w-auto object-contain transition-all duration-300",
              !scrolled && "drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-foreground/75 hover:text-foreground"
                    : "text-white hover:text-white/80",
                  active && (scrolled ? "text-foreground" : "text-white")
                )}
              >
                {t(item.key)}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-px",
                      scrolled ? "bg-foreground" : "bg-white"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher solid={scrolled} />
          </div>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className={cn(
              "hidden md:inline-flex",
              !scrolled && "text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Link href={{ pathname: "/acomodacoes", hash: "duvidas" }}>{t("faq")}</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/reservar">{t("bookNow")}</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("openMenu")}
                className={cn(
                  "md:hidden",
                  !scrolled && "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col gap-8 sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>{t("menuLabel")}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-1 px-1">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted",
                        pathname === item.href && "bg-muted text-foreground"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href={{ pathname: "/acomodacoes", hash: "duvidas" }}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t("faq")}
                  </Link>
                </SheetClose>
              </div>
              <div className="flex flex-col gap-4 border-t border-border pt-4">
                <LanguageSwitcher />
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/reservar">{t("bookNow")}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
