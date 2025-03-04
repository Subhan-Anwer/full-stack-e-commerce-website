"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItems = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItems[],
  metadata: Metadata
) {
  try {
    console.log("🟢 Starting createCheckoutSession...");
    console.log("📦 Received Items:", JSON.stringify(items, null, 2));
    console.log("👤 Metadata:", JSON.stringify(metadata, null, 2));

    // Check if any items are missing prices
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      console.error("❌ Some items don't have a price:", itemsWithoutPrice);
      throw new Error("Some items don't have a price");
    }

    // Search for existing customer by email
    console.log("🔍 Searching for existing customer...");
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("✅ Existing customer found:", customerId);
    } else {
      console.log("⚠️ No existing customer found. A new one will be created.");
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/basket`;

    console.log("✅ Success URL:", successUrl);
    console.log("❌ Cancel URL:", cancelUrl);

    // Creating a checkout session
    console.log("🛒 Creating checkout session with Stripe...");
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    console.log("🎉 Checkout session created:", session);
    return session.url;
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    throw error;
  }
}
