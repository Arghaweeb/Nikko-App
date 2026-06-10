"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { useApp } from "@/lib/providers";
import { hotels } from "@/lib/data";
import { L } from "@/lib/utils";
import { CoinSeal, Leaves, ReviewCard, SectionTitle, Stars, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";

export default function HotelDetailPage() {
  const params = useParams<{ id: string }>();
  const { t, lang } = useApp();

  const hotel = hotels.find((h) => h.id === params.id);
  if (!hotel) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 opacity-70">404</p>
        <Link href="/hotels" className="btn btn-primary">
          {t("common.back")}
        </Link>
      </div>
    );
  }

  const avg = hotel.reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, hotel.reviews.length);

  return (
    <div className="space-y-8 py-6">
      <Link href="/hotels" className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100">
        <ArrowLeft size={15} /> {t("common.back")}
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden">
        <div className="relative h-56 sm:h-72">
          <ScenicArt art={hotel.art} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="mb-2 flex flex-wrap gap-2">
              {hotel.themes.map((th) => (
                <ThemeChip key={th} theme={th} />
              ))}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl">{L(hotel.name, lang)}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <Stars value={avg} />
              <span className="inline-flex items-center gap-1 opacity-90">
                <MapPin size={13} /> {L(hotel.area, lang)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed opacity-90">{L(hotel.description, lang)}</p>

            <div>
              <h3 className="eyebrow mb-2">{t("hotels.amenities")}</h3>
              <ul className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
                {hotel.amenities.map((a, i) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    <Check size={14} className="text-forest-600 dark:text-forest-300" />
                    {L(a, lang)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span>
                {t("hotels.priceRange")}: <span className="font-medium">{hotel.priceRange}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                {t("hotels.sustainability")}: <Leaves value={hotel.sustainability} />
              </span>
              <span className="inline-flex items-center gap-1 text-gold-700 dark:text-gold-300">
                <CoinSeal size={15} /> +{hotel.earnRate} {t("hotels.earnNote")}
              </span>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <h3 className="eyebrow mb-3">{t("hotels.bookVia")}</h3>
            <div className="space-y-2">
              {hotel.bookingLinks.map((b) => (
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
        <SectionTitle eyebrow={t("nav.hotels")} title={t("hotels.reviews")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {hotel.reviews.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </ul>
      </section>
    </div>
  );
}
