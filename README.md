# Swepoke Platform (Next.js + Supabase)

Grund för en komplett e-handelsplattform för TCG (Pokémon/One Piece/övriga kort), med:

- Next.js App Router
- Tailwind-baserat designsystem enligt din designriktning
- Supabase (auth, databas, realtime-förberedelser, storage-förberedelser)
- Stripe checkout + webhook-skelett (Klarna via Stripe, Swish via extern gateway)
- Flerspråkighet (SV/EN) via i18n-lager
- Skyddad admin-route (`/admin`) med rollkontroll-skelett

## 1) Kom igång

```bash
npm install
npm run dev
```

Öppna: `http://localhost:3000`

## 2) Miljövariabler

Kopiera `.env.example` till `.env.local` och fyll i:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_EMAILS` (kommaseparerad lista)
- `RESEND_API_KEY` (för framtida e-postutskick)

## 3) Databas (Supabase)

Schema finns i `supabase/schema.sql` och innehåller tabeller:

- `products`
- `auctions`
- `bids`
- `orders`
- `profiles` (kopplad till auth users, med `role`)
- `site_content`
- `site_images`
- `payment_methods`

Kör SQL-filen i Supabase SQL editor.

## 4) Befintliga routes

- `/` Startsida
- `/products` Produktlisting med filter/sortering
- `/products/[id]` Produktsida
- `/auctions` Auktioner med countdown och budhistorik (mockad i frontend)
- `/cart` Kundvagn
- `/account` Min sida
- `/admin` Adminpanel (kräver admin i `ADMIN_EMAILS`)
- `/api/checkout` Stripe checkout-session (skelett)
- `/api/webhooks/stripe` Stripe webhook (skelett)

## 5) Rekommenderad nästa implementation

1. Byt mock-data i `src/lib/mock-data.ts` till Supabase-anrop.
2. Lägg till Supabase Auth UI och sessionshantering.
3. Implementera realtime-bud via Supabase channels på `bids`.
4. Slutför orderpipeline i webhook-route:
   - markera order som betald
   - trigga e-post (Resend)
5. Bygg admin actions för CRUD:
   - produkter
   - auktioner
   - site_content / site_images
   - betalmetoder
6. Integrera Swish via vald gateway (Billmate/Nets).

## 6) Design och komponenter

Projektet använder tokens i `src/app/globals.css` för att efterlikna det bifogade designspråket:

- primära röda nyanser
- mjuka surface-toner
- Plus Jakarta Sans / Inter
- hero-gradient, glass-nav, holo-shimmer

## 7) Säkerhet

- Kör dependency audit:
  ```bash
  npm audit
  npm audit fix
  ```
- Lägg till strikt validering för API-routes innan produktion.
- Aktivera RLS policies i Supabase för alla tabeller före drift.
