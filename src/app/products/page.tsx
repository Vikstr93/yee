import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Sortiment
          </p>
          <h1 className="font-headline text-4xl font-black">Alla produkter</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <select className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm">
            <option>Kategori</option>
            <option>Pokémon</option>
            <option>One Piece</option>
          </select>
          <select className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm">
            <option>Språk</option>
            <option>JP</option>
            <option>EN</option>
          </select>
          <select className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm">
            <option>Sortera</option>
            <option>Nyast</option>
            <option>Pris stigande</option>
            <option>Pris fallande</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <div className="mt-2 flex items-center justify-between text-xs text-[var(--on-surface-variant)]">
              <span>{product.setName}</span>
              <Link className="text-[var(--primary)] hover:underline" href={`/products/${product.id}`}>
                Visa detaljer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
