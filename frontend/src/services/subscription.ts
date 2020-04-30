import { SubscriptionTier } from 'types/adminTypes'

export default function(tier: SubscriptionTier) {
  return {
    canViewInsights() {
      return tier === SubscriptionTier.Pro
    }
  }
}
