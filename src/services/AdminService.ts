import Admin, { PASSWORD_SALT, SubscriptionTier } from '../models/Admin'
import emailService from './EmailService'

import { uuid } from '@shared'

export default {
  getById(id: string) {
    return Admin.query().findById(id)
  },

  async createAdmin(email: string) {
    const admin = await Admin.query().insertAndFetch({
      id: uuid(),
      email
    })
    emailService.accountCreated(admin)
    return admin
  },

  setSubscription(userId: string, tier: SubscriptionTier) {
    return Admin.query()
      .where('id', userId)
      .patch({ subscriptionTier: tier })
  }
}
