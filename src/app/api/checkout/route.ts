import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { products } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productIds?: string[];
      method?: "card" | "klarna" | "swish";
    };

    const selected = products.filter((product) =>
      (body.productIds ?? []).includes(product.id),
    );

    if (selected.length === 0) {
      return NextResponse.json(
        { error: "No products selected for checkout." },
        { status: 400 },
      );
    }

    const stripe = getStripeClient();
    if (!stripe) {
      return NextResponse.json(
        {
          message:
            "Stripe key missing. Add STRIPE_SECRET_KEY to enable real checkout.",
          fallbackOrderPreview: {
            method: body.method ?? "card",
            total: selected.reduce((sum, p) => sum + p.price, 0),
            items: selected.map((p) => ({ id: p.id, title: p.title, price: p.price })),
          },
        },
        { status: 200 },
      );
    }

    const paymentMethodTypes =
      body.method === "klarna"
        ? (["klarna"] as const)
        : body.method === "swish"
          ? (["card"] as const)
          : (["card"] as const);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/cart?cancelled=1`,
      payment_method_types: [...paymentMethodTypes],
      line_items: selected.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "sek",
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
      })),
      metadata: {
        method: body.method ?? "card",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Checkout initialization failed", details: String(error) },
      { status: 500 },
    );
  }
}
