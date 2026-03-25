import type { SupportedLocale } from "@/lib/types";

type TranslationTree = Record<string, string | TranslationTree>;

const translations: Record<SupportedLocale, TranslationTree> = {
  sv: {
    brand: "Swepoke",
    nav: {
      pokemon: "Pokémon",
      onePiece: "One Piece",
      otherTcg: "Övriga TCG",
      newReleases: "Nya släpp",
      graded: "Graded kort",
      auctions: "Auktioner",
      products: "Produkter",
      account: "Min sida",
      admin: "Admin",
      cart: "Kundvagn",
    },
    hero: {
      badge: "Premium Collection",
      titleA: "Ascended",
      titleB: "Heroes.",
      body: "Kuraterade urval av sällsynta Pokémon TCG-grails. Höginvesterings-singlar, PSA-gradade legender och limiterade japanska exklusiver.",
      primaryCta: "Shop The Vault",
      secondaryCta: "Visa auktion",
    },
    common: {
      currency: "kr",
      addToCart: "Lägg i kundvagn",
      readMore: "Läs mer",
      active: "Aktiv",
      hidden: "Dold",
      sold: "Såld",
      filters: "Filter",
      sortBy: "Sortera",
      language: "Språk",
      status: "Status",
      stock: "Lager",
      save: "Spara",
    },
    sections: {
      categoriesTitle: "Utforska hobbyn",
      productsTitle: "Current Grails.",
      productsSubtitle: "Utvalda kort baserat på raritet, skick och långsiktig potential.",
      auctionsTitle: "Liveauktioner",
      auctionsSubtitle: "Bud uppdateras i realtid via Supabase Realtime.",
    },
    footer: {
      blurb:
        "Swedens destination för premium TCG collectibles och investeringsklassade kort.",
      shop: "Shop",
      support: "Support",
      copy: "© 2026 Swepoke Collectibles. Swedish Collector's Choice.",
    },
  },
  en: {
    brand: "Swepoke",
    nav: {
      pokemon: "Pokémon",
      onePiece: "One Piece",
      otherTcg: "Other TCG",
      newReleases: "New Releases",
      graded: "Graded Cards",
      auctions: "Auctions",
      products: "Products",
      account: "My Account",
      admin: "Admin",
      cart: "Cart",
    },
    hero: {
      badge: "Premium Collection",
      titleA: "Ascended",
      titleB: "Heroes.",
      body: "Curated selections of rare Pokémon TCG grails. High-investment singles, PSA-graded legends and limited Japanese exclusives.",
      primaryCta: "Shop The Vault",
      secondaryCta: "View Auction",
    },
    common: {
      currency: "SEK",
      addToCart: "Add to cart",
      readMore: "Read more",
      active: "Active",
      hidden: "Hidden",
      sold: "Sold",
      filters: "Filters",
      sortBy: "Sort",
      language: "Language",
      status: "Status",
      stock: "Stock",
      save: "Save",
    },
    sections: {
      categoriesTitle: "Explore the hobby",
      productsTitle: "Current Grails.",
      productsSubtitle: "Selected cards based on rarity, condition and long-term value.",
      auctionsTitle: "Live Auctions",
      auctionsSubtitle: "Bids update in realtime via Supabase Realtime.",
    },
    footer: {
      blurb:
        "Swedens destination for premium TCG collectibles and investment-grade cards.",
      shop: "Shop",
      support: "Support",
      copy: "© 2026 Swepoke Collectibles. Swedish Collector's Choice.",
    },
  },
};

function getValueFromTree(tree: TranslationTree, path: string): string {
  const value = path.split(".").reduce<string | TranslationTree | undefined>((acc, key) => {
    if (typeof acc !== "object" || acc === null) {
      return undefined;
    }
    return (acc as TranslationTree)[key];
  }, tree);

  if (typeof value === "string") {
    return value;
  }

  return path;
}

export function t(locale: SupportedLocale, key: string): string {
  return getValueFromTree(translations[locale], key);
}

export function getDefaultLocale(): SupportedLocale {
  return "sv";
}
