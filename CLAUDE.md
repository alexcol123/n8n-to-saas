# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack on http://localhost:3000
- `npm run build` - Build production application with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

### Installing Dependencies
- `npm install` - Install all dependencies
- `npm install <package>` - Add new dependency

### Stripe Testing
- Use Stripe test card: `4242 4242 4242 4242` with any future expiry and any 3-digit CVC
- Test webhook events locally using Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks`

## Architecture

This is a Next.js 15.5.2 application using:
- **App Router** (app/ directory structure)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **Turbopack** for faster builds and development
- **Stripe** integration for subscription payments (stripe and @stripe/stripe-js packages installed)

### Subscription System
- **Product**: "Site Access" subscription at $10/month
- **Payment Flow**: Stripe Checkout → Success/Cancel pages → Dashboard access
- **No Database**: Using Stripe as the source of truth for subscription data
- **Learning Focus**: Simple implementation for understanding Stripe fundamentals

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page with subscription signup
  - `success/page.tsx` - Payment success page (note: file content mismatch with cancel logic)
  - `cancel/page.tsx` - Payment cancellation page (note: file content mismatch with success logic)
  - `dashboard/page.tsx` - Premium content dashboard
  - `globals.css` - Global styles with Tailwind directives
  - `api/` - API routes
    - `checkout/route.ts` - Create Stripe checkout sessions
    - `checkout-session/route.ts` - Retrieve session details
- `lib/` - Utility functions
  - `stripe.ts` - Stripe configuration and helpers
- `public/` - Static assets

### Key Configuration
- **TypeScript**: Strict mode enabled, using path alias `@/*` for root imports
- **Next.js**: Configured with Turbopack for improved performance
- **Styling**: Tailwind CSS v4 with PostCSS configuration
- **Stripe**: API version 2023-10-16

## Environment Variables

Required environment variables (create `.env.local`):

```env
# Stripe Keys (Test mode for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Getting Stripe Keys
1. Create account at stripe.com
2. In Dashboard → Developers → API keys:
   - Copy "Publishable key" (pk_test_...) for NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - Copy "Secret key" (sk_test_...) for STRIPE_SECRET_KEY
3. Create product in Dashboard → Products:
   - Name: "Site Access"
   - Price: $10.00 USD monthly
   - Copy Price ID (price_...) and update in `app/page.tsx`
4. For webhooks: Use Stripe CLI or create endpoint in Dashboard → Webhooks

## Implementation Notes

### Critical Setup Steps
1. Replace `price_YOUR_PRICE_ID_HERE` in `app/page.tsx` with actual Stripe Price ID
2. Ensure all environment variables are set before testing
3. Test with Stripe test card numbers only during development

### File Content Issue
- **Note**: Success and cancel page files have swapped content - `success/page.tsx` contains cancel logic and `cancel/page.tsx` contains success logic. This needs to be fixed.

### Stripe Integration Patterns
- **Client-side**: Use `@stripe/stripe-js` for redirectToCheckout
- **Server-side**: Use `stripe` package for API calls
- **Error Handling**: Graceful fallbacks for payment failures

### Testing Workflow
1. Start dev server: `npm run dev`
2. Navigate to homepage: http://localhost:3000
3. Click "Subscribe Now" button
4. Use test card: 4242 4242 4242 4242
5. Complete checkout flow
6. Verify success page and dashboard access