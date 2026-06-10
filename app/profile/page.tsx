"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, Globe, Leaf, MapPin, Moon, Sun, User } from "lucide-react";
import { useApp } from "@/lib/providers";
import { fmt } from "@/services/rates";
import { formatDate } from "@/lib/utils";
import { CoinSeal, SectionTitle, StatCard } from "@/components/ui";
import { ThemePicker } from "@/components/ThemePicker";
import { SalamanderFigure } from "@/components/Mascot";

export default function ProfilePage() {
  const { t, lang, setLang, mode, toggleMode, eco, coin, notifications } = useApp();

  const visited = 2 + Math.floor(eco / 120);
  const co2Kg = (eco * 0.18).toFixed(1);

  return (
    <div className="space-y-8 py-6">
      <SectionTitle eyebrow={t("nav.profile")} title={t("profile.title")} />

      {/* Traveler card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card flex items-center gap-4 p-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest-50 dark:bg-forest-900/40">
          <SalamanderFigure size={52} />
        </div>
        <div className="min-w-0">
          <p className="font-display text-xl">{t("profile.traveler")}</p>
          <p className="inline-flex items-center gap-1 text-xs opacity-65">
            <MapPin size={12} /> Nikko, Tochigi · {t("profile.memberSince")} 2026
          </p>
        </div>
        <User size={18} className="ml-auto opacity-40" />
      </motion.div>

      {/* Trip stats */}
      <section>
        <SectionTitle eyebrow={t("nav.profile")} title={t("profile.stats")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t("profile.visited")} value={fmt(visited)} icon={<MapPin size={18} />} accent="indigo" />
          <StatCard label={t("rewards.ecoScore")} value={fmt(eco)} sub={t("common.points")} icon={<Leaf size={18} />} accent="green" />
          <StatCard label={t("profile.coinEarned")} value={fmt(coin)} icon={<CoinSeal size={18} />} accent="gold" />
          <StatCard label={t("profile.co2")} value={`${co2Kg} kg`} icon={<Leaf size={18} />} accent="green" />
        </div>
      </section>

      {/* Preferences */}
      <section>
        <SectionTitle eyebrow={t("nav.profile")} title={t("profile.preferences")} />
        <div className="card space-y-5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <Globe size={16} className="opacity-60" /> {t("profile.language")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={lang === "en" ? "btn btn-primary" : "btn btn-ghost"}
              >
                English
              </button>
              <button
                onClick={() => setLang("ja")}
                aria-pressed={lang === "ja"}
                className={lang === "ja" ? "btn btn-primary" : "btn btn-ghost"}
              >
                日本語
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              {mode === "light" ? <Sun size={16} className="opacity-60" /> : <Moon size={16} className="opacity-60" />}
              {t("profile.appearance")}
            </span>
            <button onClick={toggleMode} className="btn btn-ghost">
              {mode === "light" ? (
                <>
                  <Moon size={15} /> {t("nav.theme.dark")}
                </>
              ) : (
                <>
                  <Sun size={15} /> {t("nav.theme.light")}
                </>
              )}
            </button>
          </div>

          <div>
            <span className="mb-3 block text-sm font-medium">{t("profile.activeTheme")}</span>
            <ThemePicker compact />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <SectionTitle eyebrow={t("nav.profile")} title={t("profile.notifications")} />
        {notifications.length === 0 ? (
          <div className="card p-6 text-center text-sm opacity-65">
            <Bell size={20} className="mx-auto mb-2 opacity-50" />
            {t("home.noReservations")}
          </div>
        ) : (
          <ul className="card divide-y divide-black/5 dark:divide-white/5">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-center gap-3 p-3.5">
                <Bell size={15} className="shrink-0 opacity-50" />
                <p className="min-w-0 flex-1 truncate text-sm">{n.text}</p>
                <span className="shrink-0 text-xs opacity-55">{formatDate(n.date, lang)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
