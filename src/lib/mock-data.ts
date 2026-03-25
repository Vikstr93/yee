import type { Auction, Order, Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "charizard-vmax-shiny",
    title: "Charizard VMAX - Shiny Vault",
    description:
      "Ikoniskt premiumkort i mycket fint skick. Passar både samlare och långsiktig investering.",
    price: 3499,
    images: [
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Pokemon",
    condition: "near_mint",
    setName: "Shining Fates",
    language: "EN",
    stock: 2,
    isGraded: true,
    psaGrade: 10,
    isAuction: false,
    createdAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "umbreon-skyridge-holo",
    title: "Umbreon - H29/H32 Holo",
    description:
      "Vintage-holo med mycket hög efterfrågan. Professionellt förvarat och verifierat skick.",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Pokemon",
    condition: "mint",
    setName: "Skyridge (2003)",
    language: "EN",
    stock: 1,
    isGraded: true,
    psaGrade: 9,
    isAuction: true,
    createdAt: "2026-03-03T10:00:00.000Z",
  },
  {
    id: "rayquaza-vmax-alt-art",
    title: "Rayquaza VMAX - Alt Art",
    description: "Modern chase card med stark prisutveckling och premium-finish.",
    price: 4150,
    images: [
      "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Pokemon",
    condition: "near_mint",
    setName: "Evolving Skies",
    language: "EN",
    stock: 4,
    isGraded: false,
    isAuction: false,
    createdAt: "2026-03-04T10:00:00.000Z",
  },
  {
    id: "crimson-haze-box-jp",
    title: "Crimson Haze - Booster Box",
    description:
      "Factory-sealed japansk box med hög samlarpotential och limiterad tillgång.",
    price: 949,
    images: [
      "https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Pokemon",
    condition: "excellent",
    setName: "Japanese S-Class",
    language: "JP",
    stock: 12,
    isGraded: false,
    isAuction: false,
    createdAt: "2026-03-07T10:00:00.000Z",
  },
];

export const featuredProducts = products.slice(0, 4);

export const auctions: Auction[] = [
  {
    id: "auc-1",
    productId: "umbreon-skyridge-holo",
    startPrice: 9000,
    currentBid: 11250,
    highestBidderId: "user_2",
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(),
    status: "active",
  },
  {
    id: "auc-2",
    productId: "charizard-vmax-shiny",
    startPrice: 2500,
    currentBid: 3200,
    highestBidderId: "user_3",
    endsAt: new Date(Date.now() + 1000 * 60 * 40).toISOString(),
    status: "active",
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-2026-0001",
    userId: "user_2",
    items: [{ productId: "charizard-vmax-shiny", quantity: 1, price: 3499 }],
    total: 3499,
    status: "paid",
    paymentMethod: "klarna",
    shippingAddress: "Stockholm",
    createdAt: "2026-03-14T10:00:00.000Z",
  },
  {
    id: "ORD-2026-0002",
    userId: "user_2",
    items: [{ productId: "crimson-haze-box-jp", quantity: 2, price: 949 }],
    total: 1898,
    status: "shipped",
    paymentMethod: "card",
    shippingAddress: "Uppsala",
    createdAt: "2026-03-18T16:30:00.000Z",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
