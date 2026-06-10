"use client";

import React from "react";
import { motion } from "framer-motion";
import { Landmark, Mountain, Soup } from "lucide-react";
import type { TourismTheme } from "@/types";
import { useApp } from "@/lib/providers";
import { cn } from "@/lib/utils";

const themes: { id: TourismTheme; icon: typeof Mountain; nameKey: "themes.nature.name" | "themes.heritage.name" | "themes.food.name"; descKey: "themes.nature.desc" | "themes.heritage.desc" | "themes.food.desc"; ring: string; active: string }[] = [
  {
    id: "nature",
    icon: Mountain,
    nameKey: "themes.nature.name",
    descKey: "themes.nature.desc",
    ring: "hover:border-forest-400",
    active: "border-forest-500 bg-forest-50 dark:bg-forest-900/40",
  },
  {
    id: "heritage",
    icon: Landmark,
    nameKey: "themes.heritage.name",
    descKey: "themes.heritage.desc",
    ring: "hover:border-indigo2-400",
    active: "border-indigo2-500 bg-indigo2-700/5 dark:bg-indigo2-900/40",
  },
  {
    id: "food",
    icon: Soup,
    nameKey: "themes.food.name",
    descKey: "themes.food.desc",
    ring: "hover:border-gold-400",
    active: "border-gold-400 bg-gold-300/10 dark:bg-gold-600/10",
  },
];

export function ThemePicker({ compact = false }: { compact?: boolean }) {
  const { t, theme, setTheme } = useApp();

  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-3")}>
      {themes.map(({ id, icon: Icon, nameKey, descKey, ring, active }) => {
        const isActive = theme === id;
        return (
          <motion.button
            key={id}
            onClick={() => setTheme(id)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "card relative p-4 text-left transition-colors",
              ring,
              isActive ? active : "border-forest-900/10 dark:border-beige-50/10"
            )}
            aria-pressed={isActive}
          >
            <div className="flex items-center gap-2">
              <Icon size={compact ? 16 : 20} className={isActive ? "text-forest-700 dark:text-gold-300" : "text-ink-soft dark:text-beige-200/60"} />
              <span className={cn("font-semibold", compact ? "text-xs" : "text-sm")}>{t(nameKey)}</span>
            </div>
            {!compact && <p className="mt-1.5 text-xs leading-relaxed text-ink-soft dark:text-beige-200/70">{t(descKey)}</p>}
            {isActive && (
              <span className="absolute right-3 top-3 rounded-full bg-gold-400 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink">
                {t("themes.active")}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
