"use client";

import Link from "next/link";
import { Suspense } from "react";
import type { SupportedLocale } from "@/lib/types";
import { t } from "@/i18n/translations";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar({ locale = "sv" }: { locale?: SupportedLocale }) {

  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface-container-lowest/90 glass-nav">
      <nav className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="font-headline text-2xl font-black tracking-tight text-primary">
          Swepoke
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link className="text-sm font-bold tracking-wide text-primary" href="/products">
            {t(locale, "nav.pokemon")}
          </Link>
          <Link className="text-sm font-bold tracking-wide text-on-surface-variant hover:text-primary" href="/auctions">
            {t(locale, "nav.auctions")}
          </Link>
          <Link className="text-sm font-bold tracking-wide text-on-surface-variant hover:text-primary" href="/products">
            {t(locale, "nav.newReleases")}
          </Link>
          <Link className="text-sm font-bold tracking-wide text-on-surface-variant hover:text-primary" href="/products?graded=true">
            {t(locale, "nav.graded")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Suspense fallback={null}>
            <LanguageSwitcher currentLocale={locale} />
          </Suspense>
          <Link className="rounded-full p-2 transition hover:bg-surface-container-high" href="/cart">
            <span className="material-symbols-outlined text-on-surface">shopping_cart</span>
          </Link>
          <Link className="rounded-full p-2 transition hover:bg-surface-container-high" href="/account">
            <span className="material-symbols-outlined text-on-surface">person</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
