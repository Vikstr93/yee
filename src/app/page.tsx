import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getContentValue } from "@/lib/content";
import { auctions, featuredProducts, products } from "@/lib/mock-data";

export default function HomePage() {
  const heroTitle = getContentValue("hero.title", "sv");
  const heroDescription = getContentValue("hero.description", "sv");
  const heroCta = getContentValue("hero.ctaPrimary", "sv");

  return (
    <div>
      <main>
        <section className="relative overflow-hidden bg-surface-container-low">
          <div className="mx-auto flex min-h-[760px] max-w-screen-2xl flex-col items-center gap-8 px-8 py-12 md:flex-row">
            <div className="space-y-8 md:w-1/2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-primary">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Premium Collection
                </span>
              </div>
              <h1 className="font-headline text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                {heroTitle}
              </h1>
              <p className="max-w-md text-lg text-on-surface-variant">{heroDescription}</p>
              <div className="flex flex-wrap gap-4">
                <Link className="hero-gradient rounded-lg px-8 py-3 font-headline text-lg font-bold text-on-primary shadow-lg shadow-primary/20" href="/products">
                  {heroCta}
                </Link>
                <Link className="rounded-lg bg-surface-container-high px-8 py-3 font-headline text-lg font-bold" href="/auctions">
                  Se auktioner
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rotate-2 overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1636102961876-d3fd2f176fbb?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium Pokémon cards"
                  className="h-[640px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-screen-2xl px-8 py-20">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-headline text-xs font-bold uppercase tracking-widest text-primary">
                Curated Categories
              </span>
              <h2 className="mt-2 font-headline text-4xl font-bold">Utforska hobbyn</h2>
            </div>
            <Link href="/products" className="font-headline font-bold text-primary">
              Alla produkter
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              "Singles & Graded Cards",
              "Booster Boxes",
              "Japanese Import",
              "Collector Supplies",
            ].map((category) => (
              <div
                key={category}
                className="rounded-xl bg-surface-container-lowest p-8 shadow-sm transition hover:shadow-lg"
              >
                <h3 className="font-headline text-xl font-bold">{category}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-low py-20">
          <div className="mx-auto max-w-screen-2xl px-8">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-5xl font-black tracking-tight">Current Grails</h2>
              <p className="mx-auto mt-4 max-w-xl text-on-surface-variant">
                Utvalda kort med fokus på skick, rarity och långsiktigt värde.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-screen-2xl px-8 py-20">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-headline text-3xl font-bold">Live-auktioner</h2>
            <Link href="/auctions" className="font-headline font-bold text-primary">
              Visa alla
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {auctions.map((auction) => {
              const product = products.find((p) => p.id === auction.productId);

              if (!product) return null;

              return (
                <div key={auction.id} className="rounded-xl bg-surface-container-low p-5">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="mb-4 h-52 w-full rounded-lg object-cover"
                  />
                  <p className="font-headline text-lg font-bold">{product.title}</p>
                  <p className="text-sm text-on-surface-variant">
                    Nuvarande bud: {auction.currentBid.toLocaleString("sv-SE")} kr
                  </p>
                  <Link
                    href="/auctions"
                    className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 font-headline text-sm font-bold text-white"
                  >
                    Lägg bud
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-8 pb-24">
          <div className="hero-gradient mx-auto max-w-screen-xl rounded-3xl p-12 text-center text-white">
            <h2 className="font-headline text-4xl font-black">Join the Swepoke Elite</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Få tidig access till drops, auktioner och investeringsguider.
            </p>
            <form className="mx-auto mt-8 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Din e-post"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 placeholder:text-white/70"
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-6 py-3 font-headline font-bold text-primary"
              >
                Prenumerera
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
