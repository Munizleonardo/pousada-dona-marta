"use client";

import { CircleHelp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function FaqFloat() {
  const t = useTranslations("Nav");

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 left-6 z-40 md:hidden"
    >
      <Link
        href={{ pathname: "/acomodacoes", hash: "duvidas" }}
        aria-label={t("faq")}
        className="flex size-12 items-center justify-center rounded-full border border-border bg-background text-primary shadow-lg shadow-black/15"
      >
        <CircleHelp className="size-5" />
      </Link>
    </motion.div>
  );
}
