import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripeClient();

  if (!signature || !webhookSecret || !stripe) {
    return NextResponse.json(
      { error: "Missing signature, webhook secret, or Stripe config" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO: Persist order as paid in Supabase and trigger confirmation email (Resend).
    // This is intentionally scaffolded to keep webhook handling explicit and safe.
    console.log("Checkout completed", session.id);
  }

  return NextResponse.json({ received: true });
}
