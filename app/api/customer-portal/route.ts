import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Create customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.get("origin")}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error("Error creating customer portal session:", error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeInvalidRequestError' && error.message?.includes('No configuration provided')) {
      return NextResponse.json(
        { 
          error: "Customer portal not configured", 
          message: "Please configure the customer portal in your Stripe dashboard first.",
          configUrl: "https://dashboard.stripe.com/test/settings/billing/portal"
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create customer portal session" },
      { status: 500 }
    );
  }
}