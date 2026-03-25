import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { siteContent, siteImages } from "@/lib/content";
import { products } from "@/lib/mock-data";
import { formatSEK } from "@/lib/utils";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="mx-auto grid max-w-screen-2xl gap-8 px-6 py-10">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Adminpanel</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Dashboard</h1>
      </header>

      <section className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-6">
        <h2 className="text-xl font-bold">Korthantering</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Lägg till, redigera eller inaktivera produkter. Koppla auktion via produktens ID.
        </p>
        <div className="mt-6 overflow-auto rounded-lg border border-outline-variant/60">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-4 py-3">Titel</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Språk</th>
                <th className="px-4 py-3">Skick</th>
                <th className="px-4 py-3">Lager</th>
                <th className="px-4 py-3">Pris</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-outline-variant/50">
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.language}</td>
                  <td className="px-4 py-3">{product.condition}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{formatSEK(product.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-6">
        <h2 className="text-xl font-bold">Auktionshantering</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Aktiv auktion övervakas i realtid via Supabase Realtime-kanaler.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-on-surface-variant">
          <li>Skapa auktion från befintligt kort (startpris, sluttid)</li>
          <li>Avsluta manuellt vid behov</li>
          <li>Skicka vinnarmejl via Edge Function + Resend</li>
        </ul>
      </section>

      <section className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-6">
        <h2 className="text-xl font-bold">CMS-light</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Redigerbara texter och bilder laddas från tabellerna <code>site_content</code> och{" "}
          <code>site_images</code>.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-outline-variant/60 bg-surface p-4">
            <h3 className="font-semibold">Texter</h3>
            <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
              {siteContent.map((entry) => (
                <li key={entry.key}>
                  <strong>{entry.key}:</strong> {entry.valueSv}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-outline-variant/60 bg-surface p-4">
            <h3 className="font-semibold">Bilder</h3>
            <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
              {siteImages.map((entry) => (
                <li key={entry.key}>
                  <strong>{entry.key}:</strong> {entry.url}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
