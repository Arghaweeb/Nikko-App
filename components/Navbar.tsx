"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Award,
  Compass,
  Home,
  Languages,
  Moon,
  Sparkles,
  Sun,
  UserRound,
  UtensilsCrossed,
  Wallet,
  BedDouble,
} from "lucide-react";
import { useApp } from "@/lib/providers";
import { cn } from "@/lib/utils";
import { SalamanderFigure } from "@/components/Mascot";

const links = [
  { href: "/", key: "nav.home", icon: Home },
  { href: "/explore", key: "nav.explore", icon: Compass },
  { href: "/experiences", key: "nav.experiences", icon: Sparkles },
  { href: "/hotels", key: "nav.hotels", icon: BedDouble },
  { href: "/restaurants", key: "nav.restaurants", icon: UtensilsCrossed },
  { href: "/wallet", key: "nav.wallet", icon: Wallet },
  { href: "/rewards", key: "nav.rewards", icon: Award },
  { href: "/profile", key: "nav.profile", icon: UserRound },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function TopNav() {
  const { t, mode, toggleMode, lang, setLang } = useApp();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-forest-900/10 bg-beige-50/85 backdrop-blur-md dark:border-beige-50/10 dark:bg-charcoal-950/85">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2">
          <SalamanderFigure size={30} />
          <span className="font-display text-lg font-semibold tracking-tight">{t("brand.name")}</span>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 xl:flex" aria-label="Primary">
          {links.map(({ href, key, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition",
                  active
                    ? "text-forest-700 dark:text-gold-300"
                    : "text-ink-soft hover:bg-forest-50 hover:text-ink dark:text-beige-200/70 dark:hover:bg-charcoal-900 dark:hover:text-beige-50"
                )}
              >
                <Icon size={15} />
                {t(key)}
                {active && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-2 -bottom-[9px] h-0.5 rounded-full bg-gold-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="btn-ghost h-9 px-2.5 py-0 text-xs"
            aria-label={t("nav.language")}
          >
            <Languages size={14} />
            {lang === "en" ? "日本語" : "EN"}
          </button>
          <button
            onClick={toggleMode}
            className="btn-ghost h-9 w-9 px-0 py-0"
            aria-label={mode === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
          >
            {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { t } = useApp();
  const pathname = usePathname();
  const mobileLinks = links.filter((l) => ["/", "/explore", "/hotels", "/wallet", "/rewards"].includes(l.href));

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-forest-900/10 bg-beige-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md dark:border-beige-50/10 dark:bg-charcoal-950/95 xl:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {mobileLinks.map(({ href, key, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium",
                active ? "text-forest-700 dark:text-gold-300" : "text-ink-soft dark:text-beige-200/60"
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
