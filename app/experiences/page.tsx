"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, Leaf } from "lucide-react";
import { useApp } from "@/lib/providers";
import { experiences } from "@/lib/data";
import { L } from "@/lib/utils";
import { SectionTitle, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";
import { ThemePicker } from "@/components/ThemePicker";

function nextDateString(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

export default function ExperiencesPage() {
  const { t, lang, theme, reservations, addReservation, addEco } = useApp();
  const [justBooked, setJustBooked] = useState<string | null>(null);

  const sorted = [...experiences].sort(
    (a, b) => Number(b.themes.includes(theme)) - Number(a.themes.includes(theme))
  );

  const isBooked = (id: string) =>
    reservations.some((r) => r.id === `exp-${id}`) || justBooked === id;

  const book = (id: string) => {
    const exp = experiences.find((e) => e.id === id);
    if (!exp || isBooked(id)) return;
    addReservation({
      id: `exp-${id}`,
      what: exp.name,
      where: { en: "Nikko", ja: "日光" },
      date: nextDateString(3),
      time: "09:00",
    });
    addEco(exp.ecoPoints, L(exp.name, lang));
    setJustBooked(id);
  };

  return (
    <div className="space-y-8 py-6">
      <SectionTitle eyebrow={t("nav.experiences")} title={t("experiences.title")} />
      <p className="-mt-5 max-w-xl text-sm opacity-75">{t("experiences.subtitle")}</p>

      <ThemePicker compact />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((exp, i) => {
          const booked = isBooked(exp.id);
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card flex flex-col overflow-hidden"
            >
              <div className="relative h-36">
                <ScenicArt art={exp.art} className="h-full w-full" />
                <div className="absolute left-3 top-3 flex gap-1.5">
                  {exp.themes.map((th) => (
                    <ThemeChip key={th} theme={th} />
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-4">
                <h3 className="font-display text-lg leading-snug">{L(exp.name, lang)}</h3>
                <p className="flex-1 text-sm leading-relaxed opacity-80">{L(exp.description, lang)}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-75">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} /> {L(exp.duration, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-forest-700 dark:text-forest-300">
                    <Leaf size={13} /> {t("experiences.earn")} +{exp.ecoPoints} {t("common.points")}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-display text-base">¥{exp.priceJpy.toLocaleString()}</span>
                  <button
                    onClick={() => book(exp.id)}
                    disabled={booked}
                    className={booked ? "btn cursor-default bg-forest-100 text-forest-800 dark:bg-forest-900/40 dark:text-forest-200" : "btn btn-primary"}
                  >
                    <CalendarCheck size={15} />
                    {booked ? t("experiences.booked") : t("experiences.book")}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
