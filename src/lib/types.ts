export type SupportedLocale = "sv" | "en";
export type UserRole = "admin" | "customer";
export type ProductLanguage = "JP" | "EN";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: string;
  setName: string;
  language: ProductLanguage;
  stock: number;
  isGraded: boolean;
  psaGrade?: number;
  isAuction: boolean;
  popularityScore?: number;
  createdAt: string;
}

export interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  currentBid: number;
  highestBidderId?: string;
  endsAt: string;
  status: "active" | "ended" | "draft";
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{ productId: string; quantity: number; price: number }>;
  total: number;
  status: "pending" | "paid" | "packed" | "shipped" | "delivered";
  paymentMethod: "card" | "klarna" | "swish";
  shippingAddress: string;
  createdAt: string;
}

export interface SiteContent {
  id: string;
  key: string;
  valueSv: string;
  valueEn: string;
}

export interface SiteImage {
  id: string;
  key: string;
  url: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}
