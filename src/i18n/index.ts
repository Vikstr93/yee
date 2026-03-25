import type { SupportedLocale } from "@/lib/types";
import { getDefaultLocale, t as translate } from "./translations";

export type Locale = SupportedLocale;

export const defaultLocale: Locale = getDefaultLocale();

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "sv" || value === "en";
}

export function t(locale: Locale, key: string): string {
  return translate(locale, key);
}
