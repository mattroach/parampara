import SessionUser from 'src/models/SessionUser'
import SessionProgress from 'src/models/SessionProgress'
import { uuid } from '@shared'

class SessionProgressService {
  async getOrCreateSessionProgress(scriptId: string, email?: string): Promise<SessionProgress> {
    if (email) {
      const user = await this.getUserByEmail(email)

      if (user) {
        const existingProgress = await this.getSessionProgress(scriptId, user.id)

        if (existingProgress) {
          return existingProgress
        }

        return await this.createSessionProgress(scriptId, user.id)
      }

      const newUser = await this.createUser(email)
      return await this.createSessionProgress(scriptId, newUser.id)
    }
    return await this.createSessionProgress(scriptId)
  }

  private async createSessionProgress(scriptId: string, userId?: string) {
    return await SessionProgress.query().insert({
      id: uuid(),
      sessionUserId: userId,
      scriptId
    })
  }

  private async createUser(email: string) {
    return await SessionUser.query().insert({
      id: uuid(),
      email
    })
  }

  private async getUserByEmail(email: string) {
    return (await SessionUser.query()
      .where('email', email))[0]
  }

  private async getSessionProgress(scriptId: string, userId: string) {
    return (await SessionProgress.query()
      .where('scriptId', scriptId)
      .where('sessionUserId', userId))[0]
  }
}

export default new SessionProgressService()