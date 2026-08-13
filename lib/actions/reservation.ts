"use server";

import nodemailer from "nodemailer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { reservationSchema, type ReservationFormValues } from "@/lib/reservation-schema";
import { WHATSAPP_NUMBER, type AccommodationId } from "@/lib/constants";

const ACCOMMODATION_LABELS: Record<AccommodationId, string> = {
  "casa-no-condominio": "Casa no Condomínio (Suíte Pátio)",
  "predio-1": "Prédio I",
  "predio-2": "Prédio II",
};

export type ReservationActionResult = { success: true } | { success: false; error: string };

function formatDate(date?: Date) {
  return date ? format(date, "PPP", { locale: ptBR }) : "-";
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("GMAIL_USER/GMAIL_APP_PASSWORD não configurados no ambiente.");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function submitReservation(
  values: ReservationFormValues
): Promise<ReservationActionResult> {
  const parsed = reservationSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos." };
  }
  const data = parsed.data;

  const fields: [string, string][] = [
    ["Nome", data.name],
    ["Telefone", data.phone],
    ["E-mail", data.email || "não informado"],
    ["Acomodação", ACCOMMODATION_LABELS[data.accommodation]],
    ["Hóspedes", data.guests],
    ["Check-in", formatDate(data.dateRange.from)],
    ["Check-out", formatDate(data.dateRange.to)],
    ["Observações", data.message || "-"],
  ];

  try {
    const transporter = getTransporter();
    const gmailUser = process.env.GMAIL_USER!;

    await transporter.sendMail({
      from: `"Site Pousada Dona Marta" <${gmailUser}>`,
      to: gmailUser,
      replyTo: data.email || undefined,
      subject: `Nova solicitação de reserva — ${data.name}`,
      text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `
        <div style="font-family: -apple-system, Segoe UI, sans-serif; font-size: 15px; color: #222;">
          <h2 style="margin: 0 0 16px;">Nova solicitação de reserva</h2>
          <table style="border-collapse: collapse;">
            ${fields
              .map(
                ([label, value]) =>
                  `<tr><td style="padding: 4px 16px 4px 0; color: #666; vertical-align: top;">${label}</td><td style="padding: 4px 0;">${value}</td></tr>`
              )
              .join("")}
          </table>
        </div>
      `,
    });

    if (data.email) {
      try {
        await transporter.sendMail({
          from: `"Pousada Dona Marta" <${gmailUser}>`,
          to: data.email,
          subject: "Recebemos sua solicitação — Pousada Dona Marta",
          text: `Olá, ${data.name}!\n\nRecebemos sua solicitação de reserva na Pousada Dona Marta e em breve nossa equipe vai confirmar a disponibilidade com você.\n\nSe preferir uma resposta mais rápida, fale com a gente pelo WhatsApp: https://wa.me/${WHATSAPP_NUMBER}\n\nAté breve!\nPousada Dona Marta`,
        });
      } catch (courtesyError) {
        console.error("Falha ao enviar confirmação ao hóspede:", courtesyError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Falha ao enviar e-mail de reserva:", error);
    return {
      success: false,
      error: "Não foi possível enviar sua solicitação. Tente novamente ou fale com a gente diretamente.",
    };
  }
}
