import Link from "next/link";

import { auctions, mockOrders, products } from "@/lib/mock-data";
import { formatSEK } from "@/lib/utils";

export default function AccountPage() {
  const activeBids = auctions.slice(0, 2).map((auction) => ({
    auction,
    product: products.find((product) => product.id === auction.productId),
  }));

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-10">
      <h1 className="font-headline text-3xl font-black tracking-tight">Min sida</h1>
      <p className="mt-2 text-sm text-on-surface-variant">
        Överblick över ordrar, aktiva bud och din wishlist.
      </p>

      <section className="mt-8">
        <h2 className="font-headline text-2xl font-bold">Orderhistorik</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-outline-variant bg-surface-container-lowest">
          <table className="w-full min-w-[650px] text-sm">
            <thead className="bg-surface-container-low text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Datum</th>
                <th className="px-4 py-3 font-semibold">Betalning</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-t border-outline-variant/40">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString("sv-SE")}
                  </td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td className="px-4 py-3">{order.status}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatSEK(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
          <h3 className="font-headline text-xl font-bold">Aktiva bud</h3>
          <ul className="mt-4 space-y-3">
            {activeBids.map(({ auction, product }) => (
              <li key={auction.id} className="rounded-lg bg-surface-container-low p-3">
                <p className="font-semibold">{product?.title ?? auction.productId}</p>
                <p className="text-sm text-on-surface-variant">
                  Nuvarande bud: {formatSEK(auction.currentBid)}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/auctions" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Gå till auktioner
          </Link>
        </article>

        <article className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
          <h3 className="font-headline text-xl font-bold">Wishlist</h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            Spara favoriter för att snabbt lägga bud eller köpa senare.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {products.slice(0, 3).map((product) => (
              <li key={product.id} className="rounded-lg bg-surface-container-low px-3 py-2">
                {product.title}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
