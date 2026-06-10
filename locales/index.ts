import en from "./en";
import ja from "./ja";
import type { Lang } from "@/types";

export const dictionaries = { en, ja } as const;
export type TKey = keyof typeof en;

export function translate(lang: Lang, key: TKey): string {
  return dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
}
