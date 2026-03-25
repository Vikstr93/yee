"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SupportedLocale } from "@/lib/types";
import { defaultLocale } from "@/i18n";

const labels: Record<SupportedLocale, string> = {
  sv: "SV",
  en: "EN",
};

export function LanguageSwitcher({
  currentLocale = defaultLocale,
}: {
  currentLocale?: SupportedLocale;
}) {
  return (
    <Suspense fallback={null}>
      <LanguageSwitcherInner currentLocale={currentLocale} />
    </Suspense>
  );
}

function LanguageSwitcherInner({
  currentLocale,
}: {
  currentLocale: SupportedLocale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const onChange = (locale: SupportedLocale) => {
    const nextParams = new URLSearchParams(params.toString());
    nextParams.set("lang", locale);
    router.push(`${pathname}?${nextParams.toString()}`);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-[var(--outline-variant)] bg-white p-1">
      {(["sv", "en"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => onChange(locale)}
          className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
            locale === currentLocale
              ? "bg-[var(--primary)] text-white"
              : "text-[var(--on-surface-variant)]"
          }`}
          aria-label={`Switch language to ${labels[locale]}`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
