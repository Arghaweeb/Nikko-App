"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { Lang, LightningTx, Reservation, ThemeMode, TourismTheme } from "@/types";
import { translate, type TKey } from "@/locales";
import { initialReservations, initialTransactions } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/* --------------------------------- Types ---------------------------------- */

export interface Notification {
  id: string;
  text: string;
  kind: "booking" | "reward" | "wallet" | "eco" | "info";
  date: string;
}

interface AppState {
  // i18n
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;

  // appearance
  mode: ThemeMode;
  toggleMode: () => void;

  // tourism theme engine
  theme: TourismTheme;
  setTheme: (t: TourismTheme) => void;

  // wallet
  walletName: string | null;
  connectWallet: (name: string) => void;
  disconnectWallet: () => void;
  sats: number;
  transactions: LightningTx[];
  pay: (sats: number, memo: string, counterparty: string, feeSats: number) => number;
  receive: (sats: number, memo: string) => void;

  // rewards
  coin: number;
  spendCoin: (amount: number) => boolean;
  addCoin: (amount: number) => void;
  eco: number;
  addEco: (points: number, label: string) => void;
  redeemed: string[];
  markRedeemed: (id: string) => void;

  // reservations
  reservations: Reservation[];
  addReservation: (r: Reservation) => void;

  // notifications (mascot feed)
  notifications: Notification[];
  notify: (text: string, kind: Notification["kind"]) => void;

  hydrated: boolean;
}

const Ctx = createContext<AppState | null>(null);

/* -------------------------------- Provider -------------------------------- */

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>("np.lang", "en");
  const [mode, setMode, hydrated] = useLocalStorage<ThemeMode>("np.mode", "light");
  const [theme, setTheme] = useLocalStorage<TourismTheme>("np.theme", "nature");

  const [walletName, setWalletName] = useLocalStorage<string | null>("np.wallet", null);
  const [sats, setSats] = useLocalStorage<number>("np.sats", 19000);
  const [transactions, setTransactions] = useLocalStorage<LightningTx[]>("np.txs", initialTransactions);

  const [coin, setCoin] = useLocalStorage<number>("np.coin", 186);
  const [eco, setEco] = useLocalStorage<number>("np.eco", 230);
  const [redeemed, setRedeemed] = useLocalStorage<string[]>("np.redeemed", []);
  const [reservations, setReservations] = useLocalStorage<Reservation[]>("np.res", initialReservations);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>("np.notifs", []);

  const t = useCallback((key: TKey) => translate(lang, key), [lang]);

  // keep <html> class in sync for Tailwind dark mode
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.lang = lang;
  }, [mode, lang]);

  const notify = useCallback(
    (text: string, kind: Notification["kind"]) => {
      setNotifications((prev) =>
        [{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text, kind, date: new Date().toISOString() }, ...prev].slice(0, 20)
      );
    },
    [setNotifications]
  );

  const toggleMode = useCallback(() => setMode((m) => (m === "light" ? "dark" : "light")), [setMode]);

  const connectWallet = useCallback(
    (name: string) => {
      setWalletName(name);
      notify(`${name} — ${translate(lang, "wallet.connected")}`, "wallet");
    },
    [setWalletName, notify, lang]
  );
  const disconnectWallet = useCallback(() => setWalletName(null), [setWalletName]);

  const addCoin = useCallback((amount: number) => setCoin((c) => c + amount), [setCoin]);

  const pay = useCallback(
    (amount: number, memo: string, counterparty: string, feeSats: number): number => {
      const coinEarned = Math.floor(amount / 1000);
      setSats((s) => Math.max(0, s - amount - feeSats));
      setTransactions((txs) =>
        [
          {
            id: `tx-${Date.now()}`,
            kind: "send" as const,
            sats: amount,
            memo: { en: memo, ja: memo },
            date: new Date().toISOString(),
            coinEarned,
            counterparty,
          },
          ...txs,
        ].slice(0, 30)
      );
      if (coinEarned > 0) setCoin((c) => c + coinEarned);
      return coinEarned;
    },
    [setSats, setTransactions, setCoin]
  );

  const receive = useCallback(
    (amount: number, memo: string) => {
      setSats((s) => s + amount);
      setTransactions((txs) =>
        [
          {
            id: `tx-${Date.now()}`,
            kind: "receive" as const,
            sats: amount,
            memo: { en: memo, ja: memo },
            date: new Date().toISOString(),
            coinEarned: 0,
            counterparty: "invoice",
          },
          ...txs,
        ].slice(0, 30)
      );
    },
    [setSats, setTransactions]
  );

  const spendCoin = useCallback(
    (amount: number): boolean => {
      let ok = false;
      setCoin((c) => {
        if (c >= amount) {
          ok = true;
          return c - amount;
        }
        return c;
      });
      return ok;
    },
    [setCoin]
  );

  const addEco = useCallback(
    (points: number, label: string) => {
      setEco((e) => e + points);
      notify(`+${points} eco · ${label}`, "eco");
    },
    [setEco, notify]
  );

  const markRedeemed = useCallback((id: string) => setRedeemed((r) => [...r, id]), [setRedeemed]);

  const addReservation = useCallback(
    (r: Reservation) => {
      setReservations((prev) => [...prev, r]);
      notify(`${r.what.en} · ${r.date} ${r.time}`, "booking");
    },
    [setReservations, notify]
  );

  const value = useMemo<AppState>(
    () => ({
      lang,
      setLang,
      t,
      mode,
      toggleMode,
      theme,
      setTheme,
      walletName,
      connectWallet,
      disconnectWallet,
      sats,
      transactions,
      pay,
      receive,
      coin,
      spendCoin,
      addCoin,
      eco,
      addEco,
      redeemed,
      markRedeemed,
      reservations,
      addReservation,
      notifications,
      notify,
      hydrated,
    }),
    [lang, setLang, t, mode, toggleMode, theme, setTheme, walletName, connectWallet, disconnectWallet, sats, transactions, pay, receive, coin, spendCoin, addCoin, eco, addEco, redeemed, markRedeemed, reservations, addReservation, notifications, notify, hydrated]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
