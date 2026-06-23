"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { useApp } from "@/lib/providers";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

export function ChatWidget() {
  const { t, lang } = useApp();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: t("chat.welcome" as any),
      date: new Date().toISOString(),
    },
  ]);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages, pending]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      date: new Date().toISOString(),
    };
    const placeholder: ChatMessage = {
      id: `m-${Date.now()}`,
      role: "model",
      text: "",
      date: new Date().toISOString(),
    };
    const next = [...messages, userMsg];
    setMessages([...next, placeholder]);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.ok || !res.body) throw new Error("network");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === placeholder.id ? { ...m, text: acc } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholder.id ? { ...m, text: t("chat.error" as any) } : m
        )
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-forest-600 text-beige-50 shadow-lift transition hover:bg-forest-700 xl:bottom-6"
        aria-label={t("chat.open" as any)}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 right-4 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-forest-900/10 bg-beige-50 shadow-lift dark:border-beige-50/10 dark:bg-charcoal-900 xl:bottom-24"
            role="dialog"
            aria-label={t("chat.title" as any)}
          >
            <header className="flex items-center gap-2 border-b border-forest-900/10 bg-forest-600 px-4 py-3 text-beige-50 dark:border-beige-50/10">
              <Sparkles size={16} className="text-gold-300" />
              <span className="font-display text-sm font-semibold">{t("chat.title" as any)}</span>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto opacity-80 hover:opacity-100"
                aria-label={t("common.close")}
              >
                <X size={16} />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-forest-600 text-beige-50"
                      : "mr-auto bg-beige-100 text-ink dark:bg-charcoal-800 dark:text-beige-50/90"
                  )}
                >
                  {m.text || (m.role === "model" && pending ? "…" : "")}
                </div>
              ))}
            </div>

            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-forest-900/10 p-2 dark:border-beige-50/10"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder" as any)}
                disabled={pending}
                maxLength={500}
                className="flex-1 rounded-xl border border-forest-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-forest-500 dark:border-beige-50/10 dark:bg-charcoal-800"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="btn-primary h-9 px-3 text-sm disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}