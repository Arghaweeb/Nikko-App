"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompareArrows, MapPin, X } from "lucide-react";
import { useApp } from "@/lib/providers";
import { hotels } from "@/lib/data";
import { L } from "@/lib/utils";
import { CoinSeal, Leaves, SectionTitle, Stars, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";

export default function HotelsPage() {
  const { t, lang, theme } = useApp();
  const [compare, setCompare] = useState<string[]>([]);

  const sorted = [...hotels].sort(
    (a, b) => Number(b.themes.includes(theme)) - Number(a.themes.includes(theme))
  );

  const toggleCompare = (id: string) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));

  const comparing = hotels.filter((h) => compare.includes(h.id));

  return (
    <div className="space-y-8 py-6">
      <SectionTitle eyebrow={t("nav.hotels")} title={t("hotels.title")} />
      <p className="-mt-5 max-w-xl text-sm opacity-75">{t("hotels.subtitle")}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        {sorted.map((h, i) => {
          const avg = h.reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, h.reviews.length);
          const inCompare = compare.includes(h.id);
          return (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card flex flex-col overflow-hidden"
            >
              <Link href={`/hotels/${h.id}`} className="group relative block h-44">
                <ScenicArt art={h.art} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute left-3 top-3 flex gap-1.5">
                  {h.themes.map((th) => (
                    <ThemeChip key={th} theme={th} />
                  ))}
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg leading-snug">{L(h.name, lang)}</h3>
                  <Stars value={avg} />
                </div>
                <p className="inline-flex items-center gap-1 text-xs opacity-70">
                  <MapPin size={12} /> {L(h.area, lang)}
                </p>
                <p className="line-clamp-2 flex-1 text-sm leading-relaxed opacity-80">{L(h.description, lang)}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="opacity-75">{t("hotels.priceRange")}: <span className="font-medium">{h.priceRange}</span></span>
                  <Leaves value={h.sustainability} />
                  <span className="inline-flex items-center gap-1 text-gold-700 dark:text-gold-300">
                    <CoinSeal size={14} /> +{h.earnRate} {t("hotels.earnNote")}
                  </span>
                </div>
                <div className="mt-1.5 flex gap-2">
                  <Link href={`/hotels/${h.id}`} className="btn btn-primary flex-1">
                    {t("hotels.details")}
                  </Link>
                  <button
                    onClick={() => toggleCompare(h.id)}
                    aria-pressed={inCompare}
                    className={inCompare ? "btn bg-indigo2-600 text-white" : "btn btn-ghost"}
                  >
                    <GitCompareArrows size={15} /> {t("hotels.compare")}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {comparing.length >= 2 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card overflow-x-auto p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg">
                {t("hotels.comparing")} ({comparing.length})
              </h3>
              <button onClick={() => setCompare([])} className="btn btn-ghost text-xs">
                <X size={14} /> {t("hotels.clearCompare")}
              </button>
            </div>
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left dark:border-white/10">
                  <th className="py-2 pr-4 font-medium opacity-60" />
                  {comparing.map((h) => (
                    <th key={h.id} className="py-2 pr-4 font-display text-base font-normal">
                      {L(h.name, lang)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&_td]:py-2.5 [&_td]:pr-4 [&_tr]:border-b [&_tr]:border-black/5 dark:[&_tr]:border-white/5">
                <tr>
                  <td className="opacity-60">{t("hotels.priceRange")}</td>
                  {comparing.map((h) => (
                    <td key={h.id}>{h.priceRange}</td>
                  ))}
                </tr>
                <tr>
                  <td className="opacity-60">{t("hotels.sustainability")}</td>
                  {comparing.map((h) => (
                    <td key={h.id}>
                      <Leaves value={h.sustainability} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="opacity-60">{t("coin.name")}</td>
                  {comparing.map((h) => (
                    <td key={h.id}>+{h.earnRate}</td>
                  ))}
                </tr>
                <tr>
                  <td className="opacity-60">{t("hotels.amenities")}</td>
                  {comparing.map((h) => (
                    <td key={h.id} className="align-top">
                      {h.amenities.slice(0, 4).map((a) => L(a, lang)).join(" · ")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
