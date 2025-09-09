import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { headers } from 'next/headers';
import { membersStore } from '@/lib/members-store';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.log('❌ No signature found');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('🎉 Webhook event received:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('💳 Payment completed!');
        console.log('Customer email:', session.customer_details?.email);
        console.log('Amount:', session.amount_total);
        
        // Add member when checkout is completed
        if (session.customer && session.customer_details?.email) {
          membersStore.addMember(
            session.customer as string,
            session.customer_details.email,
            session.subscription as string
          );
          membersStore.showStats();
        }
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('📅 Subscription created!');
        console.log('Subscription ID:', subscription.id);
        console.log('Status:', subscription.status);
        break;

      case 'customer.subscription.updated':
        const updatedSub = event.data.object;
        console.log('🔄 Subscription updated!');
        console.log('Status:', updatedSub.status);
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object;
        console.log('❌ Subscription cancelled!');
        console.log('Subscription ID:', deletedSub.id);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('✅ Invoice payment succeeded!');
        console.log('Amount paid:', invoice.amount_paid);
        
        // Update member status and show stats when invoice payment succeeds
        if (invoice.customer) {
          const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer.id;
          membersStore.updateMemberStatus(customerId, 'active');
          membersStore.showStats();
          
          // This is where you'd see the member count jump from 0 to 1!
          console.log('🎉 MEMBER COUNT UPDATE - Invoice payment succeeded for customer:', customerId);
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('💥 Invoice payment failed!');
        console.log('Customer:', failedInvoice.customer);
        break;

      default:
        console.log(`🤷 Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}