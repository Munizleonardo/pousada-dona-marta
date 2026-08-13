"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function WhatsappFloat() {
  const t = useTranslations("Reservation.whatsappMessage");

  return (
    <motion.a
      href={buildWhatsappUrl(t("greeting"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
      <WhatsappIcon className="size-7" />
    </motion.a>
  );
}
