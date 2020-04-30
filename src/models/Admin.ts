import { Model } from 'objection'

export const PASSWORD_SALT = '6878dea8-50b2-469d-8bef-75322a3c715e'

export default class Admin extends Model {
  id!: string
  email!: string
  password!: string
  subscriptionTier!: 'free' | 'pro'

  static tableName = 'admin'
}
