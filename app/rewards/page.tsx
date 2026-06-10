"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Bike,
  Bird,
  Bus,
  Footprints,
  Leaf,
  Lock,
  Sparkles,
  Trees,
  Trophy,
} from "lucide-react";
import { useApp } from "@/lib/providers";
import { badges, leaderboard, redeemOptions } from "@/lib/data";
import { L } from "@/lib/utils";
import { fmt } from "@/services/rates";
import { CoinSeal, ProgressBar, SectionTitle, StatCard } from "@/components/ui";
import type { TKey } from "@/locales";

const badgeIcons: Record<string, React.ReactNode> = {
  footprints: <Footprints size={20} />,
  trees: <Trees size={20} />,
  bike: <Bike size={20} />,
  bird: <Bird size={20} />,
  leaf: <Leaf size={20} />,
  award: <Award size={20} />,
};

const activities: { key: TKey; points: number; icon: React.ReactNode }[] = [
  { key: "rewards.eco.walk", points: 25, icon: <Footprints size={15} /> },
  { key: "rewards.eco.cycle", points: 40, icon: <Bike size={15} /> },
  { key: "rewards.eco.transit", points: 20, icon: <Bus size={15} /> },
  { key: "rewards.eco.certified", points: 30, icon: <Leaf size={15} /> },
  { key: "rewards.eco.activities", points: 60, icon: <Sparkles size={15} /> },
  { key: "rewards.eco.itinerary", points: 50, icon: <Trees size={15} /> },
];

export default function RewardsPage() {
  const { t, lang, eco, coin, addEco, redeemed, markRedeemed, spendCoin, notify } = useApp();

  const nextBadge = badges.find((b) => b.threshold > eco);
  const board = leaderboard
    .map((p) => (p.name === "you" ? { name: t("rewards.you"), points: eco, you: true } : { ...p, you: false }))
    .sort((a, b) => b.points - a.points);

  const redeem = (id: string, cost: number, name: string) => {
    if (redeemed.includes(id)) return;
    if (spendCoin(cost)) {
      markRedeemed(id);
      notify(`${t("coin.redeemed")} · ${name}`, "reward");
    } else {
      notify(t("coin.notEnough"), "info");
    }
  };

  return (
    <div className="space-y-8 py-6">
      <SectionTitle eyebrow={t("nav.rewards")} title={t("rewards.title")} />
      <p className="-mt-5 max-w-xl text-sm opacity-75">{t("rewards.subtitle")}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={t("rewards.ecoScore")} value={fmt(eco)} sub={t("common.points")} icon={<Leaf size={18} />} accent="green" />
        <StatCard label={t("coin.balance")} value={fmt(coin)} icon={<CoinSeal size={18} />} accent="gold" />
        <StatCard
          label={t("rewards.nextBadge")}
          value={nextBadge ? L(nextBadge.name, lang) : t("rewards.unlocked")}
          sub={nextBadge ? `${fmt(Math.max(0, nextBadge.threshold - eco))} ${t("common.points")}` : undefined}
          icon={<Trophy size={18} />}
          accent="indigo"
        />
      </div>

      {nextBadge && (
        <div className="card p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="opacity-70">{t("rewards.milestones")}</span>
            <span className="font-medium">
              {fmt(eco)} / {fmt(nextBadge.threshold)}
            </span>
          </div>
          <ProgressBar value={eco} max={nextBadge.threshold} />
        </div>
      )}

      {/* Log an activity */}
      <section>
        <SectionTitle eyebrow={t("rewards.howToEarn")} title={t("rewards.logActivity")} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a) => (
            <button
              key={a.key}
              onClick={() => addEco(a.points, t(a.key))}
              className="card flex items-center gap-3 p-4 text-left transition-shadow hover:shadow-lift"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300">
                {a.icon}
              </span>
              <span className="flex-1 text-sm">{t(a.key)}</span>
              <span className="text-sm font-medium text-forest-700 dark:text-forest-300">+{a.points}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section>
        <SectionTitle eyebrow={t("nav.rewards")} title={t("rewards.badges")} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b, i) => {
            const unlocked = eco >= b.threshold;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={unlocked ? "card flex items-start gap-3 p-4" : "card flex items-start gap-3 p-4 opacity-55"}
              >
                <span
                  className={
                    unlocked
                      ? "seal flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gold-900"
                      : "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/40 dark:bg-white/10 dark:text-white/40"
                  }
                >
                  {unlocked ? badgeIcons[b.icon] : <Lock size={18} />}
                </span>
                <div>
                  <p className="text-sm font-medium">{L(b.name, lang)}</p>
                  <p className="text-xs leading-relaxed opacity-70">{L(b.description, lang)}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-forest-700 dark:text-forest-300">
                    {unlocked ? t("rewards.unlocked") : `${t("rewards.locked")} · ${fmt(b.threshold)} ${t("common.points")}`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leaderboard */}
        <section>
          <SectionTitle eyebrow={t("nav.rewards")} title={t("rewards.leaderboard")} />
          <ol className="card divide-y divide-black/5 dark:divide-white/5">
            {board.map((p, i) => (
              <li
                key={p.name + i}
                className={p.you ? "flex items-center gap-3 bg-gold-50/70 p-3.5 dark:bg-gold-900/15" : "flex items-center gap-3 p-3.5"}
              >
                <span className="w-6 text-center font-display text-sm opacity-60">{i + 1}</span>
                <span className="flex-1 text-sm font-medium">
                  {p.name}
                  {p.you && " ✦"}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-forest-700 dark:text-forest-300">
                  <Leaf size={13} /> {fmt(p.points)}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Redeem */}
        <section>
          <SectionTitle eyebrow={t("coin.name")} title={t("coin.redeemTitle")} />
          <ul className="card divide-y divide-black/5 dark:divide-white/5">
            {redeemOptions.map((r) => {
              const done = redeemed.includes(r.id);
              const affordable = coin >= r.cost;
              return (
                <li key={r.id} className="flex items-center gap-3 p-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{L(r.name, lang)}</p>
                    <p className="text-xs opacity-60">{L(r.kind, lang)}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-gold-700 dark:text-gold-300">
                    <CoinSeal size={13} /> {r.cost}
                  </span>
                  <button
                    onClick={() => redeem(r.id, r.cost, L(r.name, lang))}
                    disabled={done || !affordable}
                    className={done ? "btn cursor-default bg-forest-100 text-forest-800 dark:bg-forest-900/40 dark:text-forest-200" : "btn btn-gold disabled:opacity-40"}
                  >
                    {done ? t("coin.redeemed") : t("coin.redeem")}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
