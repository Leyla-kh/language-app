import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  type InvoiceWithSubscription = Stripe.Invoice & {
    subscription: string;
  };
  const body = await req.text();

  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Webhook error: ${message}`, {
      status: 400,
    });
  }

  //Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscriptionId = session.subscription as string;

    if (!session?.metadata?.userId) {
      console.error("❌ Missing userId in session metadata");
      return new NextResponse("User ID is required", { status: 400 });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const price = subscription.items.data[0]?.price;
      const periodEnd = subscription.items.data[0]?.current_period_end;

      if (!price || !periodEnd) {
        throw new Error("Incomplete subscription data");
      }
      await db.insert(userSubscription).values({
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: price.id,
        stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
      });

      console.log(
        "✅ New subscription saved for user:",
        session.metadata.userId
      );
    } catch (err) {
      console.error("❌ Failed to insert subscription:", err);
      return new NextResponse("Failed to save subscription", { status: 500 });
    }
  }

  // Handle invoice.payment_succeeded
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as InvoiceWithSubscription;
    const subscriptionId = invoice.subscription;
    if (!subscriptionId) {
      console.error("No subscription ID in invoice");
      return new NextResponse("Subscription ID missing", { status: 400 });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log(
        "Subscription retrieved:",
        JSON.stringify(subscription, null, 2)
      );
      const price = subscription.items.data[0]?.price;
      const periodEnd = subscription.items.data[0]?.current_period_end;

      if (!price || !periodEnd) {
        throw new Error("Incomplete subscription data for update");
      }

      await db
        .update(userSubscription)
        .set({
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(periodEnd * 1000),
        })
        .where(eq(userSubscription.stripeSubscriptionId, subscription.id));
      console.log("✅ Subscription updated:", subscription.id);
    } catch (err) {
      console.error("❌ Failed to update subscription:", err);
      return new NextResponse("Failed to update subscription", {
        status: 500,
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
