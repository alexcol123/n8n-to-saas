import { currentUser } from '@clerk/nextjs/server';

export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'expert';

export const SUBSCRIPTION_TIERS = {
  FREE: 'free' as const,
  BASIC: 'basic' as const,
  PREMIUM: 'premium' as const,
  EXPERT: 'expert' as const,
};

export const PRICE_IDS = {
  BASIC: 'price_1S5pDrAikXlKuqX04GErTuad',
  PREMIUM: 'price_1S5pDwAikXlKuqX0UHaXpVyh',
  EXPERT: 'price_1S5pE3AikXlKuqX0chJ63sqr',
} as const;

export function mapPriceIdToTier(priceId: string): SubscriptionTier {
  switch (priceId) {
    case PRICE_IDS.BASIC:
      return SUBSCRIPTION_TIERS.BASIC;
    case PRICE_IDS.PREMIUM:
      return SUBSCRIPTION_TIERS.PREMIUM;
    case PRICE_IDS.EXPERT:
      return SUBSCRIPTION_TIERS.EXPERT;
    default:
      return SUBSCRIPTION_TIERS.FREE;
  }
}

export async function getUserSubscriptionTier(): Promise<SubscriptionTier> {
  const user = await currentUser();
  
  if (!user) {
    return SUBSCRIPTION_TIERS.FREE;
  }

  // Check user's public metadata for subscription tier
  const tier = user.publicMetadata?.subscriptionTier as SubscriptionTier;
  return tier || SUBSCRIPTION_TIERS.FREE;
}

export function hasAccessToTier(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
  const tierHierarchy = {
    [SUBSCRIPTION_TIERS.FREE]: 0,
    [SUBSCRIPTION_TIERS.BASIC]: 1,
    [SUBSCRIPTION_TIERS.PREMIUM]: 2,
    [SUBSCRIPTION_TIERS.EXPERT]: 3,
  };

  return tierHierarchy[userTier] >= tierHierarchy[requiredTier];
}

export function getAccessibleTiers(userTier: SubscriptionTier): SubscriptionTier[] {
  const allTiers: SubscriptionTier[] = ['free', 'basic', 'premium', 'expert'];
  return allTiers.filter(tier => hasAccessToTier(userTier, tier));
}

export async function getUserStripeCustomerId(): Promise<string | null> {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  // Get Stripe customer ID from private metadata (secure)
  return user.privateMetadata?.stripeCustomerId as string || null;
}