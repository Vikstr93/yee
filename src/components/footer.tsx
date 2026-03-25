import { t } from "@/i18n";
import type { SupportedLocale } from "@/lib/types";

export function Footer({ locale = "sv" }: { locale?: SupportedLocale }) {
  return (
    <footer className="bg-surface-container-low border-t border-outline/20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-headline text-xl font-extrabold text-primary">Swepoke</p>
          <p className="mt-3 max-w-lg text-sm text-on-surface-variant">{t(locale, "footer.blurb")}</p>
        </div>
        <div>
          <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            {t(locale, "footer.shop")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Pokemon TCG</li>
            <li>One Piece TCG</li>
            <li>Graded Vault</li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            {t(locale, "footer.support")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Shipping policy</li>
            <li>Returns</li>
            <li>Payment methods</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline/20 px-6 py-4 text-center text-xs text-on-surface-variant">
        {t(locale, "footer.copy")}
      </div>
    </footer>
  );
}
