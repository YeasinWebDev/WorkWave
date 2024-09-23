import { connectdb } from "@/lib/connectdb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    console.log(`❌ Error message: ${error}`);
    return new Response(`Webhook Error: ${error}`, { status: 400 });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const payment = {
      sessionId: id,
      amount: amount_total,
      payment: metadata.payment,
      createdAt: new Date(),
    };

    const db = await connectdb();
    if (!db)
      return NextResponse.json({ massage: "Database connection failed" });

    const paymentCollection = await db.collection("payment");
    const newPayment = await paymentCollection.insertOne(payment);

    return NextResponse.json({ message: "OK", newPayment });
  }
}
