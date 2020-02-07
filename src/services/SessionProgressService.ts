import SessionUser from 'src/models/SessionUser'
import SessionProgress from 'src/models/SessionProgress'
import { uuid } from '@shared'

class SessionProgressService {
  async updateSessionProgress(sessionId: string, currentItemId: number, items: any[]) {
    const numUpdated = await SessionProgress.query()
      .findById(sessionId)
      .patch({ currentItemId, items })

    if (numUpdated === 0)
      throw Error(`session ID ${sessionId} not found`)
  }

  async getOrCreateSessionProgress(scriptId: string, email?: string): Promise<SessionProgress> {
    if (email) {
      const user = await this.getUserByEmail(email)

      if (user) {
        const existingProgress = await this.getSessionProgress(scriptId, user.id)

        if (existingProgress)
          return existingProgress

        return await this.createSessionProgress(scriptId, user.id)
      }

      const newUser = await this.createUser(email)
      const progress = await this.createSessionProgress(scriptId, newUser.id)
      return await this.getSessionProgressById(progress.id)
    }
    const progress = await this.createSessionProgress(scriptId)
    return await this.getSessionProgressById(progress.id)
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

  private async getSessionProgressById(id: string) {
    return await SessionProgress.query().findById(id)
  }

  private async getSessionProgress(scriptId: string, userId: string) {
    return (await SessionProgress.query()
      .where('scriptId', scriptId)
      .where('sessionUserId', userId))[0]
  }
}

export default new SessionProgressService()