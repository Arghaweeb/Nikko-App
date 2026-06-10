"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Copy,
  Info,
  Plug,
  Unplug,
  Zap,
} from "lucide-react";
import { useApp } from "@/lib/providers";
import { lightningWallets } from "@/lib/data";
import { createInvoice, settle, type MockInvoice } from "@/services/lightning";
import { RATES, fmt, satsToCoin, satsToJpy } from "@/services/rates";
import { L, formatDate } from "@/lib/utils";
import { CoinSeal, QrPattern, SectionTitle, StatCard } from "@/components/ui";

type Flow = "idle" | "send" | "sendConfirm" | "sending" | "sent" | "receive" | "invoice";

export default function WalletPage() {
  const { t, lang, walletName, connectWallet, disconnectWallet, sats, coin, transactions, pay, receive, notify } = useApp();

  const [flow, setFlow] = useState<Flow>("idle");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [invoiceInput, setInvoiceInput] = useState("");
  const [invoice, setInvoice] = useState<MockInvoice | null>(null);
  const [lastFee, setLastFee] = useState(0);
  const [lastEarned, setLastEarned] = useState(0);
  const [copied, setCopied] = useState(false);

  const amt = Math.max(0, Math.floor(Number(amount) || 0));

  const resetFlow = () => {
    setFlow("idle");
    setAmount("");
    setMemo("");
    setInvoiceInput("");
    setInvoice(null);
    setCopied(false);
  };

  const startSendConfirm = () => {
    if (amt <= 0 || amt > sats) return;
    setFlow("sendConfirm");
  };

  const confirmSend = async () => {
    setFlow("sending");
    const { feeSats } = await settle();
    const earned = pay(amt, memo || "Lightning payment", invoiceInput ? "invoice" : "nikko-merchant@pay.nikko.jp", feeSats);
    setLastFee(feeSats);
    setLastEarned(earned);
    notify(`${t("wallet.paymentSent")} · ${fmt(amt)} sats`, "wallet");
    setFlow("sent");
  };

  const makeInvoice = () => {
    if (amt <= 0) return;
    setInvoice(createInvoice(amt, memo || "Nikko Passport"));
    setFlow("invoice");
  };

  const simulateReceive = () => {
    if (!invoice) return;
    receive(invoice.sats, invoice.memo);
    notify(`${t("wallet.paymentReceived")} · ${fmt(invoice.sats)} sats`, "wallet");
    resetFlow();
  };

  const copyInvoice = async () => {
    if (!invoice) return;
    try {
      await navigator.clipboard.writeText(invoice.bolt11);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  /* ------------------------------ Not connected ----------------------------- */
  if (!walletName) {
    return (
      <div className="space-y-8 py-6">
        <SectionTitle eyebrow={t("nav.wallet")} title={t("wallet.title")} />
        <p className="-mt-5 max-w-xl text-sm opacity-75">{t("wallet.subtitle")}</p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="card mx-auto max-w-md p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300">
            <Zap size={26} />
          </div>
          <h2 className="mb-2 font-display text-xl">{t("wallet.chooseWallet")}</h2>
          <p className="mb-5 text-sm opacity-75">{t("wallet.notConnected")}</p>
          <div className="space-y-2">
            {lightningWallets.map((w) => (
              <button key={w.id} onClick={() => connectWallet(w.name)} className="btn btn-ghost w-full justify-between">
                {w.name}
                <Plug size={15} />
              </button>
            ))}
          </div>
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs opacity-60">
            <Info size={13} /> {t("wallet.demo")}
          </p>
        </motion.div>
      </div>
    );
  }

  /* -------------------------------- Connected ------------------------------- */
  return (
    <div className="space-y-8 py-6">
      <SectionTitle
        eyebrow={t("nav.wallet")}
        title={t("wallet.title")}
        action={
          <button onClick={disconnectWallet} className="btn btn-ghost text-xs">
            <Unplug size={14} /> {t("wallet.disconnect")}
          </button>
        }
      />
      <p className="-mt-5 text-sm opacity-75">
        {t("wallet.connected")}: <span className="font-medium">{walletName}</span>
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t("wallet.balance")}
          value={`${fmt(sats)} ${t("common.sats")}`}
          sub={`≈ ¥${fmt(satsToJpy(sats))}`}
          icon={<Zap size={18} />}
          accent="gold"
        />
        <StatCard
          label={t("coin.balance")}
          value={fmt(coin)}
          sub={`≈ ¥${fmt(Math.round(coin * RATES.jpyPerCoin))}`}
          icon={<CoinSeal size={18} />}
          accent="green"
        />
        <StatCard
          label={t("wallet.rates")}
          value={`1,000 ${t("common.sats")} = 1 ${t("coin.symbol")}`}
          sub={`1 ${t("coin.symbol")} ≈ ¥${RATES.jpyPerCoin} · 1 BTC ≈ ¥${fmt(RATES.jpyPerBtc)}`}
          accent="indigo"
        />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 sm:max-w-md">
        <button onClick={() => (flow === "send" ? resetFlow() : (resetFlow(), setFlow("send")))} className="btn btn-primary py-3">
          <ArrowUpRight size={17} /> {t("wallet.send")}
        </button>
        <button onClick={() => (flow === "receive" ? resetFlow() : (resetFlow(), setFlow("receive")))} className="btn btn-gold py-3">
          <ArrowDownLeft size={17} /> {t("wallet.receive")}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* ---------------------------- SEND: form ---------------------------- */}
        {flow === "send" && (
          <motion.div key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card max-w-md space-y-3 p-5">
            <h3 className="font-display text-lg">{t("wallet.payInvoice")}</h3>
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-70">BOLT11</span>
              <input value={invoiceInput} onChange={(e) => setInvoiceInput(e.target.value)} placeholder="lnbc…" className="input" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-70">{t("wallet.amountSats")}</span>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" placeholder="2100" className="input" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-70">{t("wallet.memo")}</span>
              <input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Soba lunch" className="input" />
            </label>
            {amt > 0 && (
              <p className="text-xs opacity-70">
                ≈ ¥{fmt(satsToJpy(amt))} · +{satsToCoin(amt)} {t("coin.symbol")}
              </p>
            )}
            <div className="flex gap-2">
              <button onClick={startSendConfirm} disabled={amt <= 0 || amt > sats} className="btn btn-primary flex-1 disabled:opacity-40">
                {t("wallet.send")}
              </button>
              <button onClick={resetFlow} className="btn btn-ghost">
                {t("wallet.cancel")}
              </button>
            </div>
          </motion.div>
        )}

        {/* -------------------------- SEND: confirm --------------------------- */}
        {flow === "sendConfirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card max-w-md space-y-4 p-5">
            <h3 className="font-display text-lg">{t("wallet.confirm")}</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="opacity-65">{t("wallet.amountSats")}</dt>
                <dd className="font-medium">{fmt(amt)} {t("common.sats")} (≈ ¥{fmt(satsToJpy(amt))})</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-65">{t("wallet.to")}</dt>
                <dd className="max-w-[60%] truncate font-mono text-xs">{invoiceInput || "nikko-merchant@pay.nikko.jp"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-65">{t("wallet.memo")}</dt>
                <dd>{memo || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-65">{t("wallet.earned")}</dt>
                <dd className="inline-flex items-center gap-1 text-gold-700 dark:text-gold-300">
                  <CoinSeal size={14} /> +{satsToCoin(amt)}
                </dd>
              </div>
            </dl>
            <div className="flex gap-2">
              <button onClick={confirmSend} className="btn btn-primary flex-1">
                <Zap size={15} /> {t("wallet.confirm")}
              </button>
              <button onClick={() => setFlow("send")} className="btn btn-ghost">
                {t("wallet.cancel")}
              </button>
            </div>
          </motion.div>
        )}

        {/* -------------------------- SEND: settling --------------------------- */}
        {flow === "sending" && (
          <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card max-w-md p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="mx-auto mb-3 h-10 w-10 rounded-full border-2 border-gold-400 border-t-transparent"
            />
            <p className="text-sm opacity-75">Lightning…</p>
          </motion.div>
        )}

        {/* ---------------------------- SEND: done ----------------------------- */}
        {flow === "sent" && (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card max-w-md space-y-3 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300"
            >
              <Check size={28} />
            </motion.div>
            <h3 className="font-display text-xl">{t("wallet.paymentSent")}</h3>
            <p className="text-sm opacity-75">
              {fmt(amt)} {t("common.sats")} · {t("wallet.fee")}: {lastFee} {t("common.sats")}
            </p>
            {lastEarned > 0 && (
              <p className="inline-flex items-center justify-center gap-1.5 text-sm text-gold-700 dark:text-gold-300">
                <CoinSeal size={15} /> {t("wallet.earned")}: +{lastEarned}
              </p>
            )}
            <button onClick={resetFlow} className="btn btn-primary mx-auto">
              {t("common.close")}
            </button>
          </motion.div>
        )}

        {/* --------------------------- RECEIVE: form --------------------------- */}
        {flow === "receive" && (
          <motion.div key="receive" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card max-w-md space-y-3 p-5">
            <h3 className="font-display text-lg">{t("wallet.createInvoice")}</h3>
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-70">{t("wallet.amountSats")}</span>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" placeholder="5000" className="input" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-70">{t("wallet.memo")}</span>
              <input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Top-up" className="input" />
            </label>
            <div className="flex gap-2">
              <button onClick={makeInvoice} disabled={amt <= 0} className="btn btn-gold flex-1 disabled:opacity-40">
                {t("wallet.createInvoice")}
              </button>
              <button onClick={resetFlow} className="btn btn-ghost">
                {t("wallet.cancel")}
              </button>
            </div>
          </motion.div>
        )}

        {/* -------------------------- RECEIVE: invoice -------------------------- */}
        {flow === "invoice" && invoice && (
          <motion.div key="invoice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card max-w-md space-y-4 p-5 text-center">
            <h3 className="font-display text-lg">{t("wallet.invoiceReady")}</h3>
            <div className="mx-auto w-fit rounded-xl bg-white p-3 shadow-card">
              <QrPattern seed={invoice.bolt11} size={180} />
            </div>
            <p className="text-sm opacity-80">
              {fmt(invoice.sats)} {t("common.sats")} ≈ ¥{fmt(satsToJpy(invoice.sats))}
            </p>
            <p className="mx-auto max-w-xs truncate font-mono text-xs opacity-55">{invoice.bolt11}</p>
            <div className="flex justify-center gap-2">
              <button onClick={copyInvoice} className="btn btn-ghost">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? t("wallet.copied") : t("wallet.copy")}
              </button>
              <button onClick={simulateReceive} className="btn btn-gold">
                <ArrowDownLeft size={15} /> {t("wallet.paymentReceived")}
              </button>
            </div>
            <button onClick={resetFlow} className="mx-auto block text-xs opacity-60 hover:opacity-100">
              {t("wallet.cancel")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------- History ------------------------------- */}
      <section>
        <SectionTitle eyebrow={t("nav.wallet")} title={t("wallet.history")} />
        <ul className="card divide-y divide-black/5 dark:divide-white/5">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex items-center gap-3 p-4">
              <span
                className={
                  tx.kind === "send"
                    ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo2-100 text-indigo2-700 dark:bg-indigo2-900/40 dark:text-indigo2-300"
                    : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-100 text-forest-700 dark:bg-forest-900/40 dark:text-forest-300"
                }
              >
                {tx.kind === "send" ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{L(tx.memo, lang)}</p>
                <p className="truncate text-xs opacity-60">
                  {formatDate(tx.date, lang)} · {tx.counterparty}
                </p>
              </div>
              <div className="text-right">
                <p className={tx.kind === "send" ? "text-sm font-medium" : "text-sm font-medium text-forest-700 dark:text-forest-300"}>
                  {tx.kind === "send" ? "−" : "+"}
                  {fmt(tx.sats)} {t("common.sats")}
                </p>
                {tx.coinEarned > 0 && (
                  <p className="inline-flex items-center gap-1 text-xs text-gold-700 dark:text-gold-300">
                    <CoinSeal size={11} /> +{tx.coinEarned}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="inline-flex items-center gap-1.5 text-xs opacity-60">
        <Info size={13} /> {t("wallet.demo")}
      </p>
    </div>
  );
}
