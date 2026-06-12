"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Sparkles, X } from "lucide-react";
import { useApp } from "@/lib/providers";
import { formatDate } from "@/lib/utils";

/**
 * Okunikko-chan (おくにっこちゃん) — the Oku-Nikko salamander mascot.
 * Chubby black axolotl with fluffy crimson gill tufts and a friendly
 * open-mouthed smile, drawn as animated SVG (no raster assets).
 */
function GillTuft({ cx, cy, angle }: { cx: number; cy: number; angle: number }) {
  // A fluffy tuft built from overlapping circles, rotated outward from the head.
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <circle cx={cx - 5} cy={cy} r="4.5" fill="#9c2e3f" />
      <circle cx={cx} cy={cy} r="5" fill="#b03a48" />
      <circle cx={cx + 5} cy={cy - 1} r="4" fill="#c44456" />
      <circle cx={cx + 9} cy={cy - 2} r="2.8" fill="#d4566a" />
    </g>
  );
}

export function SalamanderFigure({
  size = 72,
  wave = false,
  walking = false,
}: {
  size?: number;
  wave?: boolean;
  walking?: boolean;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      initial={false}
      animate={
        walking
          ? { rotate: [0, -4, 0, 4, 0], y: [0, -3, 0, -3, 0] }
          : wave
            ? { rotate: [0, -3, 3, -2, 0] }
            : { rotate: 0, y: 0 }
      }
      transition={
        walking
          ? { repeat: Infinity, duration: 0.9, ease: "easeInOut" }
          : { duration: 1.4, ease: "easeInOut" }
      }
      aria-hidden="true"
    >
      {/* tail — chubby curl, gently swishing */}
      <motion.path
        d="M82 88 q20 4 26 -16 q-12 6 -18 0 q4 10 -8 16"
        fill="#23282b"
        animate={{ rotate: [0, 5, 0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
        style={{ originX: "82px", originY: "88px" }}
      />
      {/* legs */}
      <ellipse cx="46" cy="102" rx="9" ry="10" fill="#262b2e" />
      <ellipse cx="72" cy="102" rx="9" ry="10" fill="#262b2e" />
      {/* body — chubby & compact, idle breathing squash */}
      <motion.g
        animate={{ scaleY: [1, 0.985, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ originX: "58px", originY: "100px" }}
      >
        <ellipse cx="58" cy="82" rx="30" ry="24" fill="#2b3134" />
        <ellipse cx="56" cy="89" rx="18" ry="12" fill="#3a4145" opacity="0.6" />
        {/* left arm */}
        <ellipse cx="31" cy="80" rx="7" ry="12" fill="#2b3134" transform="rotate(14 31 80)" />
        {/* right arm — waves hello */}
        <motion.ellipse
          cx="85"
          cy="80"
          rx="7"
          ry="12"
          fill="#2b3134"
          animate={wave ? { rotate: [-14, -60, -14, -60, -14] } : { rotate: -14 }}
          transition={{ duration: 1.6 }}
          style={{ originX: "85px", originY: "88px" }}
        />
        {/* gold goshuin seal on belly */}
        <circle cx="58" cy="86" r="5.5" fill="#d9ad4f" opacity="0.9" />
        <path d="M58 82.6 l1.1 2.2 2.2 .35 -1.65 1.55 .45 2.2 -2.1 -1.1 -2.1 1.1 .45 -2.2 -1.65 -1.55 2.2 -.35 Z" fill="#7a5a14" />
      </motion.g>
      {/* gill tufts — fluffy crimson, swaying like underwater */}
      <motion.g
        animate={{ rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        style={{ originX: "30px", originY: "40px" }}
      >
        <GillTuft cx={24} cy={26} angle={-145} />
        <GillTuft cx={20} cy={38} angle={178} />
        <GillTuft cx={24} cy={50} angle={150} />
      </motion.g>
      <motion.g
        animate={{ rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut" }}
        style={{ originX: "86px", originY: "40px" }}
      >
        <GillTuft cx={92} cy={26} angle={-35} />
        <GillTuft cx={96} cy={38} angle={2} />
        <GillTuft cx={92} cy={50} angle={30} />
      </motion.g>
      {/* head — big and round */}
      <ellipse cx="58" cy="42" rx="31" ry="27" fill="#2e3437" />
      <ellipse cx="50" cy="32" rx="14" ry="9" fill="#3a4145" opacity="0.45" />
      {/* eyes with blink */}
      <motion.g
        animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
        transition={{ repeat: Infinity, duration: 4.6, times: [0, 0.46, 0.5, 0.54, 1] }}
        style={{ originX: "58px", originY: "39px" }}
      >
        <circle cx="45" cy="39" r="4.6" fill="#0d0f10" />
        <circle cx="71" cy="39" r="4.6" fill="#0d0f10" />
        <circle cx="46.4" cy="37.4" r="1.5" fill="#fff" />
        <circle cx="72.4" cy="37.4" r="1.5" fill="#fff" />
      </motion.g>
      {/* blush */}
      <ellipse cx="37" cy="50" rx="5" ry="3" fill="#e58a96" opacity="0.4" />
      <ellipse cx="79" cy="50" rx="5" ry="3" fill="#e58a96" opacity="0.4" />
      {/* friendly open-mouth smile with soft pink */}
      <path d="M44 50 q14 13 28 0 q-1.5 13 -14 13 q-12.5 0 -14 -13 Z" fill="#1a1d1f" />
      <path d="M48 56 q10 8 20 0 q-2 5.5 -10 5.5 q-8 0 -10 -5.5 Z" fill="#ef9aa6" />
    </motion.svg>
  );
}

export function MascotAssistant() {
  const { t, lang, notifications, eco, hydrated } = useApp();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = useMemo(
    () => [t("mascot.greet"), t("mascot.tipWallet"), t("mascot.tipEco"), t("mascot.tipTheme")],
    [t]
  );

  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 9000);
    return () => clearInterval(id);
  }, [tips.length]);

  if (!hydrated || dismissed) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="card w-80 max-w-[calc(100vw-2rem)] p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-gold-500" />
                <span className="text-sm font-semibold">{t("notif.title")}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t("common.close")} className="rounded-full p-1 hover:bg-forest-50 dark:hover:bg-charcoal-800">
                <X size={14} />
              </button>
            </div>
            <ul className="max-h-56 space-y-2 overflow-y-auto pr-1">
              {notifications.length === 0 && (
                <li className="text-sm text-ink-soft dark:text-beige-200/70">{tips[tipIndex]}</li>
              )}
              {notifications.map((n) => (
                <li key={n.id} className="rounded-xl bg-forest-50 px-3 py-2 text-sm dark:bg-charcoal-800">
                  <span className="mr-2 inline-block">
                    {n.kind === "reward" || n.kind === "eco" ? <Sparkles size={12} className="inline text-gold-500" /> : null}
                  </span>
                  {n.text}
                  <span className="block text-[10px] text-ink-soft/70 dark:text-beige-200/50">{formatDate(n.date, lang)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-forest-900/10 pt-2 text-xs text-ink-soft dark:border-beige-50/10 dark:text-beige-200/60">
              {eco >= 500 ? t("mascot.celebrate") : tips[tipIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-1.5">
        <button
          onClick={() => setDismissed(true)}
          aria-label={t("mascot.hide")}
          className="mb-1 rounded-full bg-white/80 p-1 text-ink-soft shadow-card hover:bg-white dark:bg-charcoal-800/80 dark:text-beige-200/70"
        >
          <X size={12} />
        </button>
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-full bg-white p-1 shadow-lift dark:bg-charcoal-800"
          aria-label={t("mascot.name")}
        >
          <SalamanderFigure size={56} wave={open} />
          {notifications.length > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-bold text-ink">
              {Math.min(notifications.length, 9)}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
