"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Bus,
  Calendar,
  CloudSun,
  Droplets,
  Flower2,
  Leaf,
  MapPin,
  Sparkles,
  Timer,
  TrainFront,
  TreePine,
  Wind,
} from "lucide-react";
import type { CrowdLevel, FoliageReport, FoliageStage, ShrineHours, TransitDeparture } from "@/types";
import { useApp } from "@/lib/providers";
import {
  attractions,
  crowdLevels,
  foliageReports,
  liveWeather,
  localEvents,
  shrineHours,
  transitDepartures,
} from "@/lib/data";
import { L, cn, formatDate } from "@/lib/utils";
import { SectionTitle } from "@/components/ui";

const CROWD_STYLE: Record<CrowdLevel["level"], { dot: string; label: string }> = {
  quiet: { dot: "bg-forest-500", label: "level.quiet" },
  moderate: { dot: "bg-gold-400", label: "level.moderate" },
  busy: { dot: "bg-orange-500", label: "level.busy" },
  packed: { dot: "bg-rose-500", label: "level.packed" },
};

const STAGE_KEY: Record<FoliageStage, string> = {
  buds: "live.foliage.stage.buds",
  early: "live.foliage.stage.early",
  peak: "live.foliage.stage.peak",
  late: "live.foliage.stage.late",
  off: "live.foliage.stage.off",
  "blossom-early": "live.foliage.stage.blossomEarly",
  "blossom-peak": "live.foliage.stage.blossomPeak",
  "blossom-late": "live.foliage.stage.blossomLate",
};

function shrineHref(id: string): string | null {
  return attractions.some((a) => a.id === id) ? `/explore/${id}` : null;
}

export default function LiveNikkoPage() {
  const { t, lang } = useApp();

  return (
    <div className="space-y-10">
      <SectionTitle level={1} eyebrow={t("nav.live")} title={t("live.title")} />
      <p className="-mt-6 max-w-2xl text-sm text-ink-soft dark:text-beige-200/70">{t("live.subtitle")}</p>

      <section className="grid gap-4 md:grid-cols-3">
        <WeatherCard
          condition={L(liveWeather.condition, lang)}
          tempC={liveWeather.tempC}
          feelsC={liveWeather.feelsC}
          humidity={liveWeather.humidity}
          windMs={liveWeather.windMs}
          updated={formatDate(liveWeather.updated, lang)}
          labels={{
            title: t("live.weather"),
            feels: t("home.weather.feels"),
            humidity: t("home.weather.humidity"),
            wind: t("home.weather.wind"),
            updated: t("live.updated"),
          }}
        />
        <div className="card p-5 md:col-span-2">
          <SectionTitle eyebrow={t("live.shrines")} title={t("live.shrines")} />
          <ul className="space-y-2.5">
            {shrineHours.map((s) => (
              <ShrineRow
                key={s.id}
                shrine={s}
                lang={lang}
                openLabel={t("live.shrines.status.open")}
                soonLabel={t("live.shrines.status.closingSoon")}
                closedLabel={t("live.shrines.status.closed")}
                lastEntryLabel={t("live.shrines.lastEntry")}
              />
            ))}
          </ul>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow={t("nav.live")} title={t("live.transit")} />
        <div className="grid gap-3 md:grid-cols-2">
          {transitDepartures.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TransitCard
                departure={d}
                lang={lang}
                onTime={t("live.transit.onTime")}
                delayLabel={t("live.transit.delay")}
                departLabel={t("live.transit.depart")}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <SectionTitle eyebrow={t("nav.live")} title={t("live.foliage")} />
          <ul className="space-y-3">
            {foliageReports.map((r) => (
              <FoliageRow
                key={r.id}
                report={r}
                lang={lang}
                stageLabel={t("live.foliage.stage")}
                peakNowLabel={t("live.foliage.peakNow")}
                peakInLabel={t("live.foliage.peakIn")}
                daysLabel={t("live.days")}
                stageText={t(STAGE_KEY[r.stage] as Parameters<typeof t>[0])}
              />
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <SectionTitle eyebrow={t("nav.live")} title={t("live.crowds")} />
          <ul className="space-y-3">
            {crowdLevels.map((c) => (
              <li key={c.id} className="flex items-center gap-3 rounded-xl border border-forest-900/10 px-3 py-2.5 dark:border-beige-50/10">
                <span className={cn("inline-flex h-2.5 w-2.5 shrink-0 rounded-full", CROWD_STYLE[c.level].dot)} aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="truncate font-medium">{L(c.spot, lang)}</span>
                    <span className="text-xs text-ink-soft dark:text-beige-200/70">
                      · {t(`live.crowds.${CROWD_STYLE[c.level].label}` as Parameters<typeof t>[0])}
                    </span>
                  </div>
                  {c.waitMin > 0 && (
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft dark:text-beige-200/60">
                      <Timer size={11} />
                      {c.waitMin} {t("common.min")} {t("live.crowds.wait")}
                    </div>
                  )}
                </div>
                <Activity
                  size={14}
                  className={cn(
                    c.trend === "up" ? "text-rose-500" : c.trend === "down" ? "text-forest-500" : "text-ink-soft",
                    "shrink-0"
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow={t("nav.live")} title={t("live.events")} />
        <div className="grid gap-3 md:grid-cols-2">
          {localEvents.map((e) => (
            <Link
              key={e.id}
              href="/community"
              className="card group block p-5 transition hover:shadow-lift"
            >
              <div className="mb-1 flex items-center gap-2 text-xs text-ink-soft dark:text-beige-200/70">
                <Sparkles size={12} className="text-gold-500" />
                {t("live.events.starts")} {formatDate(e.start, lang)}
                <span>· {t("live.events.until")} {formatDate(e.end, lang)}</span>
              </div>
              <h3 className="font-display text-base font-semibold">{L(e.name, lang)}</h3>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft dark:text-beige-200/70">
                <MapPin size={11} />
                {L(e.where, lang)}
              </div>
              <p className="mt-2 text-sm leading-relaxed">{L(e.description, lang)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function WeatherCard({
  condition,
  tempC,
  feelsC,
  humidity,
  windMs,
  updated,
  labels,
}: {
  condition: string;
  tempC: number;
  feelsC: number;
  humidity: number;
  windMs: number;
  updated: string;
  labels: { title: string; feels: string; humidity: string; wind: string; updated: string };
}) {
  return (
    <div className="card p-5">
      <SectionTitle eyebrow={labels.title} title={condition} />
      <div className="flex items-center gap-4">
        <CloudSun size={52} className="text-gold-400" strokeWidth={1.4} />
        <div>
          <div className="font-display text-4xl font-semibold">{tempC}°C</div>
          <div className="text-xs text-ink-soft dark:text-beige-200/60">
            {labels.feels} {feelsC}°C
          </div>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 text-xs text-ink-soft dark:text-beige-200/70">
        <li className="flex items-center gap-1.5">
          <Droplets size={12} />
          {labels.humidity} {humidity}%
        </li>
        <li className="flex items-center gap-1.5">
          <Wind size={12} />
          {labels.wind} {windMs} m/s
        </li>
        <li className="flex items-center gap-1.5">
          <Calendar size={12} />
          {labels.updated} · {updated}
        </li>
      </ul>
    </div>
  );
}

function ShrineRow({
  shrine,
  lang,
  openLabel,
  soonLabel,
  closedLabel,
  lastEntryLabel,
}: {
  shrine: ShrineHours;
  lang: "en" | "ja";
  openLabel: string;
  soonLabel: string;
  closedLabel: string;
  lastEntryLabel: string;
}) {
  const statusText = shrine.status === "open" ? openLabel : shrine.status === "closing-soon" ? soonLabel : closedLabel;
  const statusClass =
    shrine.status === "open"
      ? "bg-forest-100 text-forest-800 dark:bg-forest-900 dark:text-forest-200"
      : shrine.status === "closing-soon"
        ? "bg-gold-300/40 text-gold-700 dark:bg-gold-600/20 dark:text-gold-300"
        : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
  const href = shrineHref(shrine.id);
  const Row = (
    <div className="flex items-center gap-3 rounded-xl border border-forest-900/10 px-3 py-2.5 dark:border-beige-50/10">
      <TreePine size={16} className="shrink-0 text-forest-600 dark:text-gold-300" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{L(shrine.name, lang)}</div>
        <div className="text-xs text-ink-soft dark:text-beige-200/60">
          {shrine.open}–{shrine.close} · {lastEntryLabel} {shrine.lastEntry}
        </div>
        {shrine.note && (
          <div className="mt-0.5 text-xs italic text-ink-soft dark:text-beige-200/60">{L(shrine.note, lang)}</div>
        )}
      </div>
      <span className={cn("chip", statusClass)}>{statusText}</span>
    </div>
  );
  return <li>{href ? <Link href={href}>{Row}</Link> : Row}</li>;
}

function TransitCard({
  departure,
  lang,
  onTime,
  delayLabel,
  departLabel,
}: {
  departure: TransitDeparture;
  lang: "en" | "ja";
  onTime: string;
  delayLabel: string;
  departLabel: string;
}) {
  const Icon = departure.mode === "train" ? TrainFront : Bus;
  const onSchedule = departure.delayMin === 0;
  return (
    <div className="card flex items-center gap-3 p-4">
      <Icon size={22} className="shrink-0 text-forest-600 dark:text-gold-300" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-sm">
          <span className="font-medium">{L(departure.line, lang)}</span>
          <span className="text-xs text-ink-soft dark:text-beige-200/70">→ {L(departure.destination, lang)}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft dark:text-beige-200/60">
          <MapPin size={11} />
          {L(departure.from, lang)}
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-lg font-semibold tracking-tight">{departure.scheduled}</div>
        <div className={cn("text-[11px] font-medium", onSchedule ? "text-forest-600 dark:text-forest-300" : "text-rose-600 dark:text-rose-300")}>
          {onSchedule ? onTime : `+${departure.delayMin} ${delayLabel}`}
        </div>
        <div className="text-[10px] text-ink-soft dark:text-beige-200/60">{departLabel}</div>
      </div>
    </div>
  );
}

function FoliageRow({
  report,
  lang,
  stageLabel,
  peakNowLabel,
  peakInLabel,
  daysLabel,
  stageText,
}: {
  report: FoliageReport;
  lang: "en" | "ja";
  stageLabel: string;
  peakNowLabel: string;
  peakInLabel: string;
  daysLabel: string;
  stageText: string;
}) {
  const isPeak = report.stage === "peak" || report.stage === "blossom-peak";
  const Icon = report.kind === "cherry" || report.kind === "azalea" ? Flower2 : Leaf;
  return (
    <li className="rounded-xl border border-forest-900/10 p-3 dark:border-beige-50/10">
      <div className="flex items-center gap-2">
        <Icon size={16} className={cn(isPeak ? "text-rose-500" : "text-forest-500")} />
        <span className="text-sm font-medium">{L(report.location, lang)}</span>
        <span
          className={cn(
            "chip ml-auto",
            isPeak
              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              : "bg-forest-100 text-forest-800 dark:bg-charcoal-800 dark:text-beige-200/80"
          )}
        >
          {stageLabel}: {stageText}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-soft dark:text-beige-200/70">{L(report.note, lang)}</p>
      <p className="mt-1 text-[11px] font-medium text-ink-soft dark:text-beige-200/60">
        {isPeak || report.forecastDays === 0
          ? peakNowLabel
          : `${peakInLabel} ${report.forecastDays} ${daysLabel}`}
      </p>
    </li>
  );
}
