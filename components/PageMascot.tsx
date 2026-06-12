"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useApp } from "@/lib/providers";
import { SalamanderFigure } from "./Mascot";

/**
 * Okunikko-chan greets the visitor on every page: waddles in from the left,
 * says a page-specific hello, waves, then toddles away. Purely decorative —
 * pointer-events are disabled so it never blocks content.
 */

const GREETINGS: Record<string, { en: string; ja: string }> = {
  "": { en: "Welcome to Nikko!", ja: "ようこそ、日光へ！" },
  explore: { en: "Let's explore together!", ja: "いっしょに たんけん！" },
  experiences: { en: "Try something new!", ja: "あたらしいこと、やってみよう！" },
  hotels: { en: "Rest well tonight!", ja: "ゆっくり やすんでね" },
  restaurants: { en: "Yummy time!", ja: "おいしいもの、いっぱい！" },
  wallet: { en: "Your coins are safe with me!", ja: "おかね、だいじにね！" },
  rewards: { en: "You're doing great!", ja: "すごい、すごい！" },
  profile: { en: "This page is all about you!", ja: "きみの ページだよ！" },
};

export function PageMascot() {
  const pathname = usePathname();
  const { lang, hydrated } = useApp();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"enter" | "greet" | "leave" | "gone">("enter");

  const segment = pathname.split("/")[1] ?? "";
  const greeting = GREETINGS[segment] ?? GREETINGS[""];

  useEffect(() => {
    setPhase("enter");
    const greet = setTimeout(() => setPhase("greet"), reduceMotion ? 0 : 1400);
    const leave = setTimeout(() => setPhase("leave"), 6500);
    const gone = setTimeout(() => setPhase("gone"), 8200);
    return () => {
      clearTimeout(greet);
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, [pathname, reduceMotion]);

  if (!hydrated || phase === "gone") return null;

  return (
    <div className="pointer-events-none fixed bottom-16 left-2 z-30 md:bottom-4" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={pathname}
          initial={reduceMotion ? { opacity: 0 } : { x: -140, opacity: 1 }}
          animate={
            phase === "leave"
              ? reduceMotion
                ? { opacity: 0 }
                : { x: -140, opacity: 1 }
              : reduceMotion
                ? { opacity: 1 }
                : { x: 0, opacity: 1 }
          }
          transition={{ duration: reduceMotion ? 0.3 : 1.4, ease: "easeInOut" }}
          className="relative"
        >
          <AnimatePresence>
            {phase === "greet" && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="absolute -top-9 left-10 whitespace-nowrap rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-lift dark:bg-charcoal-800 dark:text-beige-50/90"
              >
                {lang === "ja" ? greeting.ja : greeting.en}
              </motion.div>
            )}
          </AnimatePresence>
          <SalamanderFigure size={64} walking={phase === "enter" || phase === "leave"} wave={phase === "greet"} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
