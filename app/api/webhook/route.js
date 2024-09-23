import { connectdb } from "@/lib/connectdb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { addMonths, parseISO } from "date-fns";
import { NextResponse } from "next/server";

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

    // Parse the `metadata.payment` string into an object
    let payment;
    try {
      payment = JSON.parse(metadata.payment);
    } catch (parseError) {
      console.error(`Error parsing payment metadata: ${parseError}`);
      return new Response(`Invalid payment metadata: ${parseError}`, { status: 400 });
    }

    const paymentDetails = {
      sessionId: id,
      amount: amount_total,
      payment: payment, // parsed payment object
      createdAt: new Date(),
    };

    // Connect to the database
    const db = await connectdb();
    if (!db) return NextResponse.json({ message: "Database connection failed" });

    const userCollection = await db.collection("users");
    const paymentCollection = await db.collection("payment");

    // Parse the `nextPayrollDate` from the payment object
    const currentPayrollDate = parseISO(payment.payrollDate);
    const nextPayrollDate = addMonths(currentPayrollDate, 1);
    const formattedNextPayrollDate = nextPayrollDate.toISOString().slice(0, 10);

    // Update user data with new status and next payroll date
    const update = await userCollection.updateOne(
      { email: payment.email },
      { $set: { status: "complete", nextPayrollDate: formattedNextPayrollDate } }
    );

    // Insert the new payment into the payment collection
    const newPayment = await paymentCollection.insertOne(paymentDetails);

    return NextResponse.json({ message: "OK", newPayment });
  }
}
