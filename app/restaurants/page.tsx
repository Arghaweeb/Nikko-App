"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, UtensilsCrossed } from "lucide-react";
import { useApp } from "@/lib/providers";
import { restaurants } from "@/lib/data";
import { L } from "@/lib/utils";
import { CoinSeal, SectionTitle, Stars, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";

export default function RestaurantsPage() {
  const { t, lang, theme } = useApp();

  const sorted = [...restaurants].sort(
    (a, b) => Number(b.themes.includes(theme)) - Number(a.themes.includes(theme))
  );

  return (
    <div className="space-y-8 py-6">
      <SectionTitle eyebrow={t("nav.restaurants")} title={t("restaurants.title")} level={1} />
      <p className="-mt-5 max-w-xl text-sm opacity-75">{t("restaurants.subtitle")}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        {sorted.map((r, i) => {
          const avg = r.reviews.reduce((s, v) => s + v.rating, 0) / Math.max(1, r.reviews.length);
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card flex flex-col overflow-hidden"
            >
              <Link href={`/restaurants/${r.id}`} className="group relative block h-40">
                <ScenicArt art={r.art} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute left-3 top-3 flex gap-1.5">
                  {r.themes.map((th) => (
                    <ThemeChip key={th} theme={th} />
                  ))}
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg leading-snug">{L(r.name, lang)}</h3>
                  <Stars value={avg} />
                </div>
                <p className="inline-flex items-center gap-1.5 text-xs opacity-75">
                  <UtensilsCrossed size={12} /> {L(r.cuisine, lang)} · {r.priceRange}
                </p>
                <p className="line-clamp-2 flex-1 text-sm leading-relaxed opacity-80">{L(r.description, lang)}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-80">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {r.hours}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gold-700 dark:text-gold-300">
                    <CoinSeal size={13} /> +{r.earnRate}
                  </span>
                </div>
                <Link href={`/restaurants/${r.id}`} className="btn btn-primary mt-1.5">
                  {t("hotels.details")}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
