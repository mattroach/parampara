import Admin, { PASSWORD_SALT } from '../models/Admin'
import emailService from './EmailService'

import { uuid } from '@shared'
import shajs from 'sha.js'
import { LoginResponse } from 'frontend/src/api/types'

class AdminService {
  async getById(id: string) {
    return await Admin.query().findById(id)
  }

  async login(adminId: string, password?: string): Promise<LoginResponse> {
    const admin = await Admin.query().findById(adminId)
    if (!admin) throw Error('Could not find user')

    if (!admin.password) {
      return { success: true }
    }

    if (!password) return { success: false }

    const hashedPassword = this.hashPassword(password)
    if (admin.password === hashedPassword) {
      return {
        success: true,
        loginToken: hashedPassword
      }
    }
    return { success: false }
  }

  async authenticateToken(adminId: string, hashedPassword?: string): Promise<boolean> {
    const admin = await Admin.query().findById(adminId)
    if (!admin) throw Error('Could not find user')

    if (!admin.password) {
      return true
    }

    if (!hashedPassword) return false

    return admin.password === hashedPassword
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
