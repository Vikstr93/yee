import Link from "next/link";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border border-[var(--outline-variant)] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-[var(--surface-container-low)]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="aspect-[3/4] w-full object-cover transition duration-300 hover:scale-[1.02]"
        />
        {product.psaGrade ? (
          <span className="absolute right-2 top-2 rounded-full bg-[var(--secondary-container)] px-2 py-1 text-xs font-semibold text-[var(--on-secondary-container)]">
            PSA {product.psaGrade}
          </span>
        ) : null}
      </div>
      <div className="space-y-2">
        <h3 className="font-headline text-lg font-bold">{product.title}</h3>
        <p className="text-sm text-[var(--on-surface-variant)]">{product.setName}</p>
        <div className="flex items-center justify-between">
          <p className="font-headline text-xl font-extrabold">
            {product.price.toLocaleString("sv-SE")} kr
          </p>
          <span className="rounded-full bg-[var(--surface-container)] px-2 py-1 text-xs uppercase tracking-wide text-[var(--on-surface-variant)]">
            {product.language}
          </span>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="inline-block rounded-lg bg-[var(--on-surface)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Visa produkt
        </Link>
      </div>
    </div>
  );
}
