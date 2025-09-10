import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { mapPriceIdToTier } from '@/lib/subscription';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    let subscriptionTier = 'basic';

    // Get subscription details to determine tier
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const priceId = subscription.items.data[0]?.price.id;
      if (priceId) {
        subscriptionTier = mapPriceIdToTier(priceId);
      }
    }

    return NextResponse.json({
      customer_email: session.customer_details?.email,
      customer_id: session.customer,
      subscription_tier: subscriptionTier,
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}