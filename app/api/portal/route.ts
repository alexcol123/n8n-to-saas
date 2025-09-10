import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { getUserStripeCustomerId } from '@/lib/subscription';

export async function POST(req: NextRequest) {
  try {
    // Get the Stripe customer ID from private metadata (secure)
    const stripeCustomerId = await getUserStripeCustomerId();
    
    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'No Stripe customer found' }, { status: 400 });
    }

    // Create the portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NODE_ENV === 'production' ? 'https://yourapp.com' : 'http://localhost:3000'}/free`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' }, 
      { status: 500 }
    );
  }
}