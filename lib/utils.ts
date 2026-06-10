import type { Lang, Localized } from "@/types";

/** Pick the right language from a bilingual field. */
export function L(field: Localized, lang: Lang): string {
  return field[lang];
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
