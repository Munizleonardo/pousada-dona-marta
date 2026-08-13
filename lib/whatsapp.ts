import { WHATSAPP_NUMBER } from "@/lib/constants";

export function buildWhatsappUrl(message: string, number: string = WHATSAPP_NUMBER) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${number}?${params.toString()}`;
}
