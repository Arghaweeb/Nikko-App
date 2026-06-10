"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Leaf, Route, Search } from "lucide-react";
import { useApp } from "@/lib/providers";
import { attractions } from "@/lib/data";
import { L } from "@/lib/utils";
import { SectionTitle, Stars, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";
import { ThemePicker } from "@/components/ThemePicker";
import type { TourismTheme } from "@/types";

const itineraries: Record<TourismTheme, { en: string[]; ja: string[] }> = {
  nature: {
    en: ["08:00 Bus up the Irohazaka switchbacks", "09:00 Kegon Falls basin platform", "10:30 E-bike along the Chūzenji shore", "13:00 Boardwalk across Senjōgahara", "16:00 Soak at Yumoto Onsen"],
    ja: ["08:00 いろは坂をバスで上る", "09:00 華厳の滝・観瀑台", "10:30 中禅寺湖畔を電動自転車で", "13:00 戦場ヶ原の木道ハイク", "16:00 湯元温泉で湯浴み"],
  },
  heritage: {
    en: ["08:30 Cross by the Shinkyo Bridge", "09:00 Rinnōji's three great Buddhas", "10:30 Tōshōgū carvings, slowly", "13:30 Futarasan Shrine forest path", "15:00 Jizō walk at Kanmangafuchi"],
    ja: ["08:30 神橋を渡って参道へ", "09:00 輪王寺・三仏堂", "10:30 東照宮の彫刻をゆっくりと", "13:30 二荒山神社の杜を歩く", "15:00 憾満ヶ淵の並び地蔵へ"],
  },
  food: {
    en: ["08:00 Morning market breakfast tour", "10:00 Yuba lifting workshop", "12:30 Juwari soba at Mizuoto", "15:00 Kissaten coffee & hard pudding", "18:00 Yuba kaiseki dinner"],
    ja: ["08:00 朝市あさごはんツアー", "10:00 湯波引き体験", "12:30 水音で十割そば", "15:00 喫茶店でコーヒーとプリン", "18:00 湯波会席の夕食"],
  },
};

export default function ExplorePage() {
  const { t, lang, theme } = useApp();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const themed = [...attractions].sort((a, b) => Number(b.themes.includes(theme)) - Number(a.themes.includes(theme)));
    if (!query.trim()) return themed;
    const q = query.toLowerCase();
    return themed.filter((a) => L(a.name, lang).toLowerCase().includes(q) || L(a.description, lang).toLowerCase().includes(q));
  }, [query, lang, theme]);

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow mb-1">{t("nav.explore")}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">{t("explore.title")}</h1>
      </header>

      <ThemePicker compact />

      <div className="relative max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft dark:text-beige-200/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("common.search")}
          className="input pl-9"
          aria-label={t("common.search")}
        />
      </div>

      <section>
        <SectionTitle title={t("explore.attractions")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => {
            const avg = a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length;
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
                <Link href={`/explore/${a.id}`} className="card group block overflow-hidden hover:shadow-lift">
                  <div className="h-36 overflow-hidden">
                    <ScenicArt art={a.art} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="font-display font-semibold leading-snug">{L(a.name, lang)}</h3>
                      <ThemeChip theme={a.themes[0]} />
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-ink-soft dark:text-beige-200/70">{L(a.description, lang)}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft dark:text-beige-200/60">
                      <Stars value={avg} />
                      <span className="flex items-center gap-1"><Clock size={11} /> {L(a.duration, lang)}</span>
                      <span className="flex items-center gap-1 text-forest-600 dark:text-forest-300"><Leaf size={11} /> +{a.ecoPoints}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="card p-5">
        <SectionTitle eyebrow={t("themes.active")} title={t("explore.itineraries")} />
        <ol className="relative space-y-3 border-l-2 border-gold-300/60 pl-5 dark:border-gold-600/40">
          {itineraries[theme][lang].map((step) => (
            <li key={step} className="relative text-sm">
              <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-gold-400 bg-beige-50 dark:bg-charcoal-950" />
              <Route size={12} className="mr-1.5 inline text-forest-600 dark:text-gold-300" />
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
