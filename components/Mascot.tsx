"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Sparkles, X } from "lucide-react";
import { useApp } from "@/lib/providers";
import { formatDate } from "@/lib/utils";

/**
 * Nikko Salamander — the app's guide and notification assistant.
 * Inspired by the Japanese giant salamander: dark body, crimson gill tufts,
 * drawn as animated SVG (no raster assets). Elegant, not cartoonish.
 */
export function SalamanderFigure({ size = 72, wave = false }: { size?: number; wave?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      initial={false}
      animate={wave ? { rotate: [0, -4, 4, -2, 0] } : { rotate: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      aria-hidden="true"
    >
      {/* tail */}
      <motion.path
        d="M60 70 q22 4 26 -12 q-14 2 -20 -2"
        fill="#23282b"
        animate={{ rotate: [0, 3, 0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ originX: "60px", originY: "70px" }}
      />
      {/* body */}
      <ellipse cx="44" cy="60" rx="26" ry="20" fill="#2b3134" />
      {/* belly sheen */}
      <ellipse cx="40" cy="66" rx="16" ry="10" fill="#3a4145" opacity="0.7" />
      {/* head */}
      <ellipse cx="40" cy="38" rx="22" ry="18" fill="#2b3134" />
      {/* gill tufts */}
      <g fill="#b03a48">
        <motion.g animate={{ rotate: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 3 }} style={{ originX: "20px", originY: "30px" }}>
          <ellipse cx="17" cy="28" rx="7" ry="3.5" transform="rotate(-30 17 28)" />
          <ellipse cx="15" cy="34" rx="7" ry="3.5" transform="rotate(-8 15 34)" />
          <ellipse cx="16" cy="40" rx="7" ry="3.5" transform="rotate(16 16 40)" />
        </motion.g>
        <motion.g animate={{ rotate: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3.4 }} style={{ originX: "62px", originY: "30px" }}>
          <ellipse cx="63" cy="28" rx="7" ry="3.5" transform="rotate(30 63 28)" />
          <ellipse cx="65" cy="34" rx="7" ry="3.5" transform="rotate(8 65 34)" />
          <ellipse cx="64" cy="40" rx="7" ry="3.5" transform="rotate(-16 64 40)" />
        </motion.g>
      </g>
      {/* eyes */}
      <circle cx="33" cy="36" r="3.4" fill="#0d0f10" />
      <circle cx="47" cy="36" r="3.4" fill="#0d0f10" />
      <circle cx="34.2" cy="34.8" r="1.1" fill="#fff" />
      <circle cx="48.2" cy="34.8" r="1.1" fill="#fff" />
      {/* smile */}
      <path d="M30 45 q10 8 20 0" stroke="#e7a4ab" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* arm (waves) */}
      <motion.ellipse
        cx="66"
        cy="56"
        rx="6"
        ry="10"
        fill="#2b3134"
        animate={wave ? { rotate: [0, 35, 0, 35, 0] } : { rotate: 0 }}
        transition={{ duration: 1.6 }}
        style={{ originX: "64px", originY: "62px" }}
      />
      <ellipse cx="24" cy="62" rx="6" ry="10" fill="#2b3134" />
      {/* gold seal on belly — ties mascot to the goshuin signature */}
      <circle cx="44" cy="64" r="5" fill="#d9ad4f" opacity="0.9" />
      <path d="M44 61 l1 2 2 .3 -1.5 1.4 .4 2 -1.9 -1 -1.9 1 .4 -2 -1.5 -1.4 2 -.3 Z" fill="#7a5a14" />
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
