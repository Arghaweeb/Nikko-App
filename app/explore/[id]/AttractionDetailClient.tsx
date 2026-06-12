"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Bus, CheckCircle2, Clock, Leaf, MapPin } from "lucide-react";
import { useApp } from "@/lib/providers";
import { attractions } from "@/lib/data";
import { L } from "@/lib/utils";
import { ReviewCard, SectionTitle, Stars, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function AttractionDetailClient({ id }: { id: string }) {
  const { t, lang, addEco } = useApp();
  const [checkins, setCheckins] = useLocalStorage<string[]>("np.checkins", []);

  const attraction = attractions.find((item) => item.id === id);
  if (!attraction) return null;

  const avg =
    attraction.reviews.length > 0
      ? attraction.reviews.reduce((sum, review) => sum + review.rating, 0) / attraction.reviews.length
      : 0;
  const checkedIn = checkins.includes(attraction.id);

  const handleCheckIn = () => {
    if (checkedIn) return;
    setCheckins((current) => [...current, attraction.id]);
    addEco(attraction.ecoPoints, L(attraction.name, lang));
  };

  const infoBlocks: { icon: React.ReactNode; label: string; body: string }[] = [
    { icon: <BookOpen size={16} />, label: t("explore.history"), body: L(attraction.history, lang) },
    { icon: <Clock size={16} />, label: t("explore.duration"), body: L(attraction.duration, lang) },
    { icon: <Bus size={16} />, label: t("explore.transport"), body: L(attraction.transport, lang) },
    { icon: <Leaf size={16} />, label: t("explore.sustainabilityInfo"), body: L(attraction.sustainability, lang) },
  ];

  return (
    <div className="space-y-8 py-6">
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100">
        <ArrowLeft size={15} /> {t("common.back")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        <div className="relative h-56 sm:h-72">
          <ScenicArt art={attraction.art} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="mb-2 flex flex-wrap gap-2">
              {attraction.themes.map((theme) => (
                <ThemeChip key={theme} theme={theme} />
              ))}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl">{L(attraction.name, lang)}</h1>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <Stars value={avg} />
              <span className="inline-flex items-center gap-1 opacity-90">
                <MapPin size={13} /> Nikko
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          <p className="text-[15px] leading-relaxed opacity-90">{L(attraction.description, lang)}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {infoBlocks.map((block) => (
              <div key={block.label} className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-700 dark:text-forest-300">
                  {block.icon} {block.label}
                </div>
                <p className="text-sm leading-relaxed opacity-85">{block.body}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleCheckIn}
            disabled={checkedIn}
            className={checkedIn ? "btn w-full cursor-default bg-forest-100 text-forest-800 dark:bg-forest-900/40 dark:text-forest-200 sm:w-auto" : "btn btn-primary w-full sm:w-auto"}
          >
            {checkedIn ? (
              <>
                <CheckCircle2 size={16} /> {t("rewards.logged")}
              </>
            ) : (
              <>
                <Leaf size={16} /> +{attraction.ecoPoints} {t("explore.earnEco")}
              </>
            )}
          </button>
        </div>
      </motion.div>

      <section>
        <SectionTitle eyebrow={t("explore.title")} title={t("hotels.reviews")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {attraction.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </ul>
      </section>
    </div>
  );
}
