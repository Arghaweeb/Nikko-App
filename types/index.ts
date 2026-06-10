export type Lang = "en" | "ja";
export type ThemeMode = "light" | "dark";

/** The three tourism discovery themes */
export type TourismTheme = "nature" | "heritage" | "food";

export interface Localized {
  en: string;
  ja: string;
}

export interface Review {
  rating: number; // 1–5
  reviewer: string;
  nationality: Localized;
  date: string; // ISO
  text: Localized;
}

export interface Hotel {
  id: string;
  name: Localized;
  area: Localized;
  description: Localized;
  priceRange: string; // e.g. "¥18,000–¥42,000"
  sustainability: number; // 1–5 leaves
  amenities: Localized[];
  themes: TourismTheme[];
  reviews: Review[];
  bookingLinks: { label: string; url: string }[];
  art: ArtSpec;
  earnRate: number; // Nikko Coin per stay
}

export interface Restaurant {
  id: string;
  name: Localized;
  cuisine: Localized;
  signature: Localized[];
  priceRange: string;
  dietary: Localized[];
  hours: string;
  description: Localized;
  themes: TourismTheme[];
  reviews: Review[];
  reserveLinks: { label: string; url: string }[];
  art: ArtSpec;
  earnRate: number;
}

export interface Attraction {
  id: string;
  name: Localized;
  history: Localized;
  description: Localized;
  duration: Localized;
  transport: Localized;
  sustainability: Localized;
  themes: TourismTheme[];
  reviews: Review[];
  art: ArtSpec;
  ecoPoints: number;
}

export interface Experience {
  id: string;
  name: Localized;
  description: Localized;
  duration: Localized;
  themes: TourismTheme[];
  priceJpy: number;
  ecoPoints: number;
  art: ArtSpec;
}

/** Procedural scenic artwork spec (keeps the repo self-contained — swap for photos later) */
export interface ArtSpec {
  /** two hues (degrees) for sky/land gradient */
  hues: [number, number];
  /** silhouette variant */
  variant: "falls" | "lake" | "shrine" | "forest" | "town" | "onsen" | "bridge" | "marsh";
}

export interface LightningTx {
  id: string;
  kind: "send" | "receive";
  sats: number;
  memo: Localized;
  date: string;
  coinEarned: number;
  counterparty: string;
}

export interface Reservation {
  id: string;
  what: Localized;
  where: Localized;
  date: string;
  time: string;
}

export interface Badge {
  id: string;
  name: Localized;
  description: Localized;
  threshold: number; // eco points needed
  icon: string; // lucide icon key handled in UI
}

export interface RedeemOption {
  id: string;
  name: Localized;
  cost: number; // Nikko Coin
  kind: Localized;
}
