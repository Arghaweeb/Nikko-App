"use client";

import React from "react";
import { Leaf, Star } from "lucide-react";
import type { Review, TourismTheme } from "@/types";
import { useApp } from "@/lib/providers";
import { L, cn, formatDate } from "@/lib/utils";

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
        <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= Math.round(value) ? "fill-gold-400 text-gold-400" : "text-forest-200 dark:text-charcoal-800"} />
      ))}
    </span>
  );
}

export function Leaves({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Sustainability ${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Leaf key={i} size={13} className={i <= value ? "fill-forest-400 text-forest-500" : "text-forest-200 dark:text-charcoal-800"} />
      ))}
    </span>
  );
}

const themeStyles: Record<TourismTheme, string> = {
  nature: "bg-forest-100 text-forest-800 dark:bg-forest-900 dark:text-forest-200",
  heritage: "bg-indigo2-700/10 text-indigo2-700 dark:bg-indigo2-800 dark:text-indigo2-400",
  food: "bg-gold-300/30 text-gold-600 dark:bg-gold-600/20 dark:text-gold-300",
};

export function ThemeChip({ theme }: { theme: TourismTheme }) {
  const { t } = useApp();
  const label =
    theme === "nature" ? t("themes.nature.name") : theme === "heritage" ? t("themes.heritage.name") : t("themes.food.name");
  return <span className={cn("chip", themeStyles[theme])}>{label}</span>;
}

export function ReviewCard({ review }: { review: Review }) {
  const { lang } = useApp();
  return (
    <li className="rounded-xl border border-forest-900/10 bg-beige-50/60 p-3.5 dark:border-beige-50/10 dark:bg-charcoal-800/60">
      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft dark:text-beige-200/70">
        <Stars value={review.rating} />
        <span className="font-medium text-ink dark:text-beige-50/90">{review.reviewer}</span>
        <span>· {L(review.nationality, lang)}</span>
        <span>· {formatDate(review.date, lang)}</span>
      </div>
      <p className="text-sm leading-relaxed">{L(review.text, lang)}</p>
    </li>
  );
}

/** The goshuin-style gold seal used for Nikko Coin */
export function CoinSeal({ size = 22 }: { size?: number }) {
  return (
    <span className="seal shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2 5 5 .7-3.7 3.4.9 5.2L12 14.8 7.8 17.3l.9-5.2L5 8.7 10 8z" fill="#5e4612" />
      </svg>
    </span>
  );
}

/** Decorative deterministic QR-style code for mock Lightning invoices */
export function QrPattern({ seed, size = 168 }: { seed: string; size?: number }) {
  const n = 21;
  let h = 2166136261;
  const bits: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h ^= seed.charCodeAt(i % seed.length);
    h = Math.imul(h, 16777619);
    bits.push(((h >>> (i % 13)) & 1) === 1);
  }
  const cell = size / n;
  const finder = (x: number, y: number) => (
    <g key={`${x}${y}`}>
      <rect x={x * cell} y={y * cell} width={cell * 7} height={cell * 7} fill="currentColor" />
      <rect x={(x + 1) * cell} y={(y + 1) * cell} width={cell * 5} height={cell * 5} fill="white" />
      <rect x={(x + 2) * cell} y={(y + 2) * cell} width={cell * 3} height={cell * 3} fill="currentColor" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white p-2 text-charcoal-950" role="img" aria-label="Lightning invoice QR code (demo)">
      {bits.map((b, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const inFinder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
        return b && !inFinder ? <rect key={i} x={x * cell} y={y * cell} width={cell * 0.92} height={cell * 0.92} fill="currentColor" /> : null;
      })}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}

export function StatCard({ label, value, sub, icon, accent }: { label: string; value: React.ReactNode; sub?: string; icon?: React.ReactNode; accent?: "gold" | "green" | "indigo" }) {
  const ring =
    accent === "gold"
      ? "from-gold-300/40"
      : accent === "indigo"
        ? "from-indigo2-400/30"
        : "from-forest-300/40";
  return (
    <div className="card relative overflow-hidden p-4">
      <div className={cn("pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br to-transparent", ring)} />
      <div className="flex items-center gap-2 text-xs font-medium text-ink-soft dark:text-beige-200/70">
        {icon}
        {label}
      </div>
      <div className="mt-1.5 font-display text-2xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-soft dark:text-beige-200/60">{sub}</div>}
    </div>
  );
}

export function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-forest-100 dark:bg-charcoal-800", className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-forest-500 to-gold-400 transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}
