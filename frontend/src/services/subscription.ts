import { SubscriptionTier } from 'types/adminTypes'

export default function(tier: SubscriptionTier) {
  return {
    isFree() {
      return tier === SubscriptionTier.Free
    },
    canViewInsights() {
      return tier === SubscriptionTier.Pro
    },
    hasWatermark() {
      return tier !== SubscriptionTier.Business
    },
    hasProBadge() {
      return tier !== SubscriptionTier.Free
    }
  }
}
