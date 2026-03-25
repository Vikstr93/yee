import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getProductById, products } from "@/lib/mock-data";

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = products.filter(
    (item) => item.id !== product.id && item.category === product.category,
  );

  return (
    <main className="mx-auto max-w-screen-2xl space-y-12 px-6 py-8 md:px-8 md:py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4 shadow-sm">
          <img
            src={product.images[0]}
            alt={product.title}
            className="aspect-[3/4] w-full rounded-lg object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {product.setName}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">{product.title}</h1>
          <p className="text-on-surface-variant">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-surface-container p-4">
              <p className="font-semibold">Skick</p>
              <p className="text-on-surface-variant">{product.condition}</p>
            </div>
            <div className="rounded-lg bg-surface-container p-4">
              <p className="font-semibold">Språk</p>
              <p className="text-on-surface-variant">{product.language}</p>
            </div>
            <div className="rounded-lg bg-surface-container p-4">
              <p className="font-semibold">Lager</p>
              <p className="text-on-surface-variant">{product.stock} st</p>
            </div>
            <div className="rounded-lg bg-surface-container p-4">
              <p className="font-semibold">PSA</p>
              <p className="text-on-surface-variant">
                {product.psaGrade ? `PSA ${product.psaGrade}` : "Ej graderad"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-4xl font-black">{product.price.toLocaleString("sv-SE")} kr</p>
            <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-on-primary transition hover:brightness-110">
              Lägg i kundvagn
            </button>
            <button className="rounded-lg bg-surface-container px-6 py-3 font-semibold text-on-surface transition hover:bg-surface-container-highest">
              Lägg i wishlist
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Relaterade kort</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.slice(0, 3).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
