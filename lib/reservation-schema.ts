import { z } from "zod";
import { ACCOMMODATIONS, type AccommodationId } from "@/lib/constants";

const accommodationIds = ACCOMMODATIONS.map((item) => item.id) as [
  AccommodationId,
  ...AccommodationId[],
];

export const reservationSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().optional(),
    phone: z.string().min(8),
    accommodation: z.enum(accommodationIds),
    guests: z.string().min(1),
    dateRange: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }),
    message: z.string().optional(),
  })
  .refine((data) => !data.email || z.string().email().safeParse(data.email).success, {
    path: ["email"],
  })
  .refine((data) => Boolean(data.dateRange.from) && Boolean(data.dateRange.to), {
    path: ["dateRange"],
  });

export type ReservationFormValues = z.infer<typeof reservationSchema>;
