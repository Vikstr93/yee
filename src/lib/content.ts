import type { SupportedLocale } from "./types";
import { siteContent, siteImages } from "./mock-data";

export { siteContent, siteImages };

export function getContentValue(key: string, locale: SupportedLocale): string {
  const found = siteContent.find((item) => item.key === key);
  if (!found) return key;
  return locale === "en" ? found.valueEn : found.valueSv;
}

export function formatSek(value: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(value);
}
