import Link from "next/link";
import { products } from "@/lib/mock-data";
import { formatSEK } from "@/lib/utils";

const cartItems = [
  { productId: "charizard-vmax-shiny", quantity: 1 },
  { productId: "rayquaza-vmax-alt-art", quantity: 1 },
];

export default function CartPage() {
  const items = cartItems
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((item) => item !== null);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 1000 ? 0 : 79;
  const total = subtotal + shipping;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-black">Kundvagn</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Granska dina varor och gå vidare till betalning.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              className="grid gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 sm:grid-cols-[96px_1fr_auto]"
              key={item.product.id}
            >
              <img alt={item.product.title} className="h-24 w-24 rounded-lg object-cover" src={item.product.images[0]} />
              <div>
                <h2 className="font-headline text-lg font-bold">{item.product.title}</h2>
                <p className="text-sm text-on-surface-variant">
                  {item.product.setName} · {item.product.condition.toUpperCase()}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">Antal: {item.quantity}</p>
              </div>
              <p className="font-headline text-lg font-extrabold">{formatSEK(item.lineTotal)}</p>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-outline-variant bg-surface-container p-6">
          <h2 className="font-headline text-xl font-bold">Sammanfattning</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatSEK(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Frakt</dt>
              <dd>{shipping === 0 ? "Gratis" : formatSEK(shipping)}</dd>
            </div>
            <div className="mt-4 flex justify-between border-t border-outline-variant pt-4 font-headline text-lg font-extrabold">
              <dt>Totalt</dt>
              <dd>{formatSEK(total)}</dd>
            </div>
          </dl>
          <Link
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-headline text-sm font-bold text-white hover:opacity-90"
            href="/api/checkout"
          >
            Fortsätt till betalning
          </Link>
        </aside>
      </div>
    </section>
  );
}
