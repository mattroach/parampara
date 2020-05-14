export enum SubscriptionTier {
  Free = 'free',
  Pro = 'pro',
  Business = 'pro2'
}

export type AdminDetails = {
  id: string
  email: string
  subscriptionTier: SubscriptionTier
}
