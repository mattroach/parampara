import Admin from '../models/Admin'
import emailService from './EmailService'

import { uuid } from '@shared'

class AdminService {
  async createAdmin(email: string) {
    const admin = await Admin.query().insertAndFetch({
      id: uuid(),
      email
    })
    emailService.accountCreated(admin)
    return admin
  }
}

export default new AdminService()
