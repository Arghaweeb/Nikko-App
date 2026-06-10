"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, Salad, UtensilsCrossed } from "lucide-react";
import { useApp } from "@/lib/providers";
import { restaurants } from "@/lib/data";
import { L } from "@/lib/utils";
import { CoinSeal, ReviewCard, SectionTitle, Stars, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";

export default function RestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const { t, lang } = useApp();

  const restaurant = restaurants.find((r) => r.id === params.id);
  if (!restaurant) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 opacity-70">404</p>
        <Link href="/restaurants" className="btn btn-primary">
          {t("common.back")}
        </Link>
      </div>
    );
  }

  const avg =
    restaurant.reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, restaurant.reviews.length);

  return (
    <div className="space-y-8 py-6">
      <Link href="/restaurants" className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100">
        <ArrowLeft size={15} /> {t("common.back")}
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden">
        <div className="relative h-52 sm:h-64">
          <ScenicArt art={restaurant.art} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="mb-2 flex flex-wrap gap-2">
              {restaurant.themes.map((th) => (
                <ThemeChip key={th} theme={th} />
              ))}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl">{L(restaurant.name, lang)}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <Stars value={avg} />
              <span className="inline-flex items-center gap-1 opacity-90">
                <UtensilsCrossed size={13} /> {L(restaurant.cuisine, lang)} · {restaurant.priceRange}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed opacity-90">{L(restaurant.description, lang)}</p>

            <div>
              <h3 className="eyebrow mb-2">{t("restaurants.signature")}</h3>
              <ul className="space-y-1.5 text-sm">
                {restaurant.signature.map((s, i) => (
                  <li key={i} className="inline-flex w-full items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {L(s, lang)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-700 dark:text-forest-300">
                  <Salad size={15} /> {t("restaurants.dietary")}
                </div>
                <p className="text-sm leading-relaxed opacity-85">
                  {restaurant.dietary.map((d) => L(d, lang)).join(" · ")}
                </p>
              </div>
              <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-700 dark:text-forest-300">
                  <Clock size={15} /> {t("restaurants.hours")}
                </div>
                <p className="text-sm leading-relaxed opacity-85">{restaurant.hours}</p>
              </div>
            </div>

            <p className="inline-flex items-center gap-1.5 text-sm text-gold-700 dark:text-gold-300">
              <CoinSeal size={15} /> +{restaurant.earnRate} {t("coin.name")}
            </p>
          </div>

          <aside className="h-fit rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <h3 className="eyebrow mb-3">{t("restaurants.reserve")}</h3>
            <div className="space-y-2">
              {restaurant.reserveLinks.map((b) => (
                <a
                  key={b.label}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full justify-between"
                >
                  {b.label === "Official Website" ? t("hotels.official") : b.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </motion.div>

      <section>
        <SectionTitle eyebrow={t("nav.restaurants")} title={t("hotels.reviews")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {restaurant.reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </ul>
      </section>
    </div>
  );
}
