"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bolt, CalendarDays, CloudSun, Droplets, Leaf, Megaphone, Wind } from "lucide-react";
import { useApp } from "@/lib/providers";
import { attractions, announcements, badges, experiences, promotions } from "@/lib/data";
import { fmt, satsToJpy } from "@/services/rates";
import { L, formatDate } from "@/lib/utils";
import { CoinSeal, ProgressBar, SectionTitle, StatCard, ThemeChip } from "@/components/ui";
import { ScenicArt } from "@/components/ScenicArt";
import { ThemePicker } from "@/components/ThemePicker";

export default function HomePage() {
  const { t, lang, theme, sats, coin, eco, reservations } = useApp();

  const recommended = attractions.filter((a) => a.themes.includes(theme)).slice(0, 3);
  const nearby = experiences.filter((e) => e.themes.includes(theme)).slice(0, 2);
  const nextBadge = badges.find((b) => b.threshold > eco) ?? badges[badges.length - 1];
  const visited = 2 + Math.floor(eco / 120);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-forest-900/10 shadow-card dark:border-beige-50/10">
        <ScenicArt art={{ hues: theme === "food" ? [35, 95] : theme === "heritage" ? [350, 40] : [205, 160], variant: theme === "food" ? "town" : theme === "heritage" ? "shrine" : "lake" }} className="absolute inset-0 h-full w-full" />
        <div className="relative bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/20 to-transparent p-6 pt-28 md:p-8 md:pt-36">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="eyebrow !text-gold-300">{t("brand.name")}</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t("home.welcome")}
            </h1>
            <p className="mt-1 max-w-lg text-sm text-white/85">{t("brand.tagline")}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Link href="/wallet">
          <StatCard
            label={t("home.walletBalance")}
            icon={<Bolt size={13} className="text-gold-500" />}
            value={<>{fmt(sats)} <span className="text-sm font-normal text-ink-soft dark:text-beige-200/60">{t("common.sats")}</span></>}
            sub={`≈ ¥${fmt(satsToJpy(sats))}`}
            accent="gold"
          />
        </Link>
        <Link href="/rewards">
          <StatCard
            label={t("coin.balance")}
            icon={<CoinSeal size={14} />}
            value={<>{fmt(coin)} <span className="text-sm font-normal text-ink-soft dark:text-beige-200/60">{t("coin.symbol")}</span></>}
            sub={t("home.seeRewards")}
            accent="gold"
          />
        </Link>
        <Link href="/rewards">
          <StatCard
            label={t("home.ecoScore")}
            icon={<Leaf size={13} className="text-forest-500" />}
            value={<>{fmt(eco)} <span className="text-sm font-normal text-ink-soft dark:text-beige-200/60">{t("common.points")}</span></>}
            sub={`${t("rewards.nextBadge")}: ${L(nextBadge.name, lang)}`}
            accent="green"
          />
        </Link>
        <StatCard
          label={t("profile.visited")}
          icon={<CalendarDays size={13} className="text-indigo2-500" />}
          value={fmt(visited)}
          sub={t("home.travelProgress")}
          accent="indigo"
        />
      </section>

      {/* Travel progress toward next badge */}
      <section className="card p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">{t("home.travelProgress")}</span>
          <span className="text-xs text-ink-soft dark:text-beige-200/60">
            {fmt(eco)} / {fmt(nextBadge.threshold)} {t("common.points")} → {L(nextBadge.name, lang)}
          </span>
        </div>
        <ProgressBar value={eco} max={nextBadge.threshold} />
      </section>

      {/* Theme engine */}
      <section>
        <SectionTitle eyebrow={t("themes.subtitle")} title={t("themes.title")} />
        <ThemePicker />
      </section>

      {/* Weather + announcements */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <SectionTitle eyebrow={t("home.weather.now")} title={t("home.weather")} />
          <div className="flex items-center gap-5">
            <CloudSun size={52} className="text-gold-400" strokeWidth={1.4} />
            <div>
              <div className="font-display text-4xl font-semibold">19°C</div>
              <div className="text-xs text-ink-soft dark:text-beige-200/60">{t("home.weather.feels")} 17°C</div>
            </div>
            <div className="ml-auto space-y-1.5 text-xs text-ink-soft dark:text-beige-200/70">
              <div className="flex items-center gap-1.5"><Droplets size={12} /> {t("home.weather.humidity")} 78%</div>
              <div className="flex items-center gap-1.5"><Wind size={12} /> {t("home.weather.wind")} 2 m/s</div>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <SectionTitle eyebrow={t("home.announcements")} title={t("home.promotions")} />
          <ul className="space-y-2.5">
            {promotions.map((p) => (
              <li key={p.id} className="flex items-start gap-2 rounded-xl bg-gold-300/15 px-3 py-2 text-sm dark:bg-gold-600/10">
                <CoinSeal size={16} />
                {L(p.text, lang)}
              </li>
            ))}
            {announcements.slice(0, 2).map((a) => (
              <li key={a.id} className="flex items-start gap-2 text-sm text-ink-soft dark:text-beige-200/70">
                <Megaphone size={14} className="mt-0.5 shrink-0 text-indigo2-500" />
                <span>
                  {L(a.text, lang)}
                  <span className="ml-1 text-[10px] opacity-70">{formatDate(a.date, lang)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recommended attractions (theme-driven) */}
      <section>
        <SectionTitle
          eyebrow={t("themes.active")}
          title={t("home.recommended")}
          action={
            <Link href="/explore" className="flex items-center gap-1 text-sm font-medium text-forest-700 hover:underline dark:text-gold-300">
              {t("home.viewAll")} <ArrowRight size={14} />
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/explore/${a.id}`} className="card group block overflow-hidden hover:shadow-lift">
                <div className="h-36 overflow-hidden">
                  <ScenicArt art={a.art} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="font-display font-semibold">{L(a.name, lang)}</h3>
                    <ThemeChip theme={a.themes[0]} />
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-ink-soft dark:text-beige-200/70">{L(a.description, lang)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reservations + nearby */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <SectionTitle title={t("home.reservations")} />
          {reservations.length === 0 ? (
            <p className="text-sm text-ink-soft dark:text-beige-200/70">{t("home.noReservations")}</p>
          ) : (
            <ul className="space-y-2.5">
              {reservations.map((r) => (
                <li key={r.id} className="flex items-center gap-3 rounded-xl border border-forest-900/10 px-3 py-2.5 dark:border-beige-50/10">
                  <CalendarDays size={16} className="shrink-0 text-forest-600 dark:text-gold-300" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{L(r.what, lang)}</div>
                    <div className="text-xs text-ink-soft dark:text-beige-200/60">
                      {L(r.where, lang)} · {formatDate(r.date, lang)} {r.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card p-5">
          <SectionTitle
            title={t("home.nearby")}
            action={
              <Link href="/experiences" className="flex items-center gap-1 text-sm font-medium text-forest-700 hover:underline dark:text-gold-300">
                {t("home.viewAll")} <ArrowRight size={14} />
              </Link>
            }
          />
          <ul className="space-y-2.5">
            {nearby.map((e) => (
              <li key={e.id}>
                <Link href="/experiences" className="flex items-center gap-3 rounded-xl border border-forest-900/10 px-3 py-2.5 transition hover:bg-forest-50 dark:border-beige-50/10 dark:hover:bg-charcoal-800">
                  <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg">
                    <ScenicArt art={e.art} className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{L(e.name, lang)}</div>
                    <div className="text-xs text-ink-soft dark:text-beige-200/60">
                      {L(e.duration, lang)} · +{e.ecoPoints} {t("common.points")}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
