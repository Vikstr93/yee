import { Countdown } from "@/components/countdown";
import { auctions, products } from "@/lib/mock-data";

export default function AuctionsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Live auktioner
        </p>
        <h1 className="font-headline text-4xl font-black tracking-tight">
          Budgivning i realtid
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
          Supabase Realtime-koppling läggs mot bids-tabellen. Tabellen nedan visar hur
          auktionerna renderas med countdown och aktuell högsta budgivare.
        </p>
      </div>
      <div className="space-y-4">
        {auctions.map((auction) => {
          const product = products.find((p) => p.id === auction.productId);
          return (
            <article
              key={auction.id}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="font-headline text-2xl font-bold">{product?.title}</h2>
                  <p className="text-sm text-on-surface-variant">
                    Startpris: {auction.startPrice.toLocaleString("sv-SE")} kr
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Högsta bud: {auction.currentBid.toLocaleString("sv-SE")} kr
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    Högst bjudande: {auction.highestBidderId ?? "Ingen ännu"}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">
                    Slutar om
                  </p>
                  <Countdown endsAt={auction.endsAt} />
                  <button className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:opacity-95">
                    Lägg bud
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
