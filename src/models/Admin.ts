import { Model } from 'objection'

export type SubscriptionTier = 'free' | 'pro' | 'pro2'

export default class Admin extends Model {
  id!: string
  email!: string
  password!: string
  subscriptionTier!: SubscriptionTier
  auth0Id!: string | null
  displayName!: string
  pictureUrl!: string | null

  static tableName = 'admin'
}
