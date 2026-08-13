export const CONTACT = {
  phones: [
    { display: "(48) 99909-2728", digits: "5548999092728" },
    { display: "(48) 99914-2278", digits: "5548999142278" },
  ],
  email: "resid.marta@gmail.com",
  address: "R. Neusa Vidal Schmidt, 43 - Enseada da Pinheira, Palhoça - SC",
  instagram: "https://www.instagram.com/pousadadonamarta",
} as const;

export const WHATSAPP_NUMBER = CONTACT.phones[0].digits;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.address
)}`;

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  CONTACT.address
)}&output=embed`;

export type AccommodationId = "casa-no-condominio" | "predio-1" | "predio-2";

export const ACCOMMODATIONS: {
  id: AccommodationId;
  icon: "home" | "building" | "building2";
  cover: string;
  gallery: { src: string; alt: string }[];
}[] = [
  {
    id: "casa-no-condominio",
    icon: "home",
    cover: "/images/rooms/suite-patio/sala-patio.webp",
    gallery: [
      { src: "/images/rooms/suite-patio/cozinha.webp", alt: "Cozinha equipada da Suíte Pátio" },
      { src: "/images/rooms/suite-patio/sala-patio.webp", alt: "Sala de estar com acesso ao pátio privativo" },
      { src: "/images/rooms/suite-patio/quarto.webp", alt: "Quarto da Suíte Pátio" },
      { src: "/images/rooms/suite-patio/banheiro.webp", alt: "Banheiro da Suíte Pátio" },
    ],
  },
  {
    id: "predio-1",
    icon: "building",
    cover: "/images/rooms/predio-1/cozinha.webp",
    gallery: [
      { src: "/images/rooms/predio-1/cozinha.webp", alt: "Cozinha com vista no Prédio I" },
      { src: "/images/rooms/predio-1/quarto.webp", alt: "Quarto no Prédio I" },
      { src: "/images/rooms/predio-1/banheiro.webp", alt: "Banheiro no Prédio I" },
    ],
  },
  {
    id: "predio-2",
    icon: "building2",
    cover: "/images/rooms/predio-2/vista-sacada.webp",
    gallery: [
      { src: "/images/rooms/predio-2/vista-sacada.webp", alt: "Vista da sacada no Prédio II" },
      { src: "/images/rooms/predio-2/sala.webp", alt: "Sala de estar no Prédio II" },
      { src: "/images/rooms/predio-2/quarto.webp", alt: "Quarto no Prédio II" },
      { src: "/images/rooms/predio-2/banheiro.webp", alt: "Banheiro no Prédio II" },
    ],
  },
];

// Full-bleed hero/banner slots need the highest-resolution source photos
// (praia-pinheira, encontro-mar-rio and trilha-morro are all 2000px+ wide).
// Smaller card-sized slots reuse the lower-resolution originals, which are
// plenty sharp at that display size.
export const HERO_IMAGE = "/images/hero/praia-pinheira.webp";
export const ABOUT_IMAGE = "/images/hero/fachada-pousada.webp";
export const LOCATION_IMAGE = "/images/hero/enseada.webp";
export const ACCOMMODATIONS_HERO_IMAGE = "/images/hero/trilha-morro.webp";
export const LOCATION_HERO_IMAGE = "/images/hero/encontro-mar-rio.webp";
export const RESERVATION_HERO_IMAGE = "/images/hero/praia-pinheira.webp";
export const CONTACT_HERO_IMAGE = "/images/hero/encontro-mar-rio.webp";
