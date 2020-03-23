import Admin, { PASSWORD_SALT } from '../models/Admin'
import emailService from './EmailService'

import { uuid } from '@shared'
import shajs from 'sha.js'

class AdminService {
  async getById(id: string) {
    return await Admin.query().findById(id)
  }

  async authenticatePassword(adminId: string, password: string): Promise<boolean> {
    const admin = await Admin.query().findById(adminId)
    if (!admin) return false
    if (!admin.password) return true
    return admin.password === this.hashPassword(password)
  }

  async createAdmin(email: string) {
    const admin = await Admin.query().insertAndFetch({
      id: uuid(),
      email
    })
    emailService.accountCreated(admin)
    return admin
  }

  async updatePassword(email: string, newPassword: string) {
    const admin = await Admin.query().findOne({ email })
    if (!admin) throw Error('User email not found.')
    return await admin
      .$query()
      .updateAndFetch({ password: this.hashPassword(newPassword) })
  }

  private hashPassword(password: string) {
    return shajs('sha256')
      .update(password + PASSWORD_SALT)
      .digest('hex')
  }
}

export default new AdminService()
