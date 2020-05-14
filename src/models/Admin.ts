import { Model } from 'objection'

export const PASSWORD_SALT = '6878dea8-50b2-469d-8bef-75322a3c715e'

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
