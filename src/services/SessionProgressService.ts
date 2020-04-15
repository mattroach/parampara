import { uuid } from '@shared'
import SessionProgress from '../models/SessionProgress'
import SessionUser from '../models/SessionUser'
import progressItemExecutor from './ProgressItemExecutor'
import ScriptVersion from '../models/ScriptVersion'

class SessionProgressService {
  async updateSessionProgress(
    sessionId: string,
    data: {
      currentItemId: number
      items: any[]
      durationSec: number
    }
  ) {
    const session = await SessionProgress.query().findById(sessionId)

    if (!session) throw Error(`session ID ${sessionId} not found`)

    await progressItemExecutor.execute(session, data.items)

    await SessionProgress.query()
      .findById(sessionId)
      .patch({
        ...data,
        progress: await this.getProgress(data.currentItemId, session)
      })
  }

  private async getProgress(currentItemId: number, session: SessionProgress) {
    const scriptVersion = await session.$relatedQuery('scriptVersion')
    return Math.floor((100 * currentItemId) / scriptVersion.items.length)
  }

  async getOrCreateSessionProgress(
    scriptId: string,
    data: {
      email?: string
      referrerCode?: string
    }
  ): Promise<SessionProgress> {
    const { email, referrerCode } = data

    if (email) {
      const user = await this.getUserByEmail(email)

      if (user) {
        // Temporary change until we obfuscate user data: always create a new session
        //const existingProgress = await this.getSessionProgress(scriptId, user.id)
        // if (existingProgress)
        //   return existingProgress

        return await this.createSessionProgress(scriptId, {
          userId: user.id,
          referrerCode
        })
      }

      const newUser = await this.createUser(email)
      return await this.createSessionProgress(scriptId, {
        userId: newUser.id,
        referrerCode
      })
    }
    return await this.createSessionProgress(scriptId, { referrerCode })
  }

  private async createSessionProgress(
    scriptId: string,
    data: {
      userId?: string
      referrerCode?: string
    }
  ) {
    const { userId, referrerCode } = data
    const scriptVersion = await ScriptVersion.query()
      .where('scriptId', scriptId)
      .modify('latest')
      .first()
    const scriptVersionId = scriptVersion.id

    return await SessionProgress.query().insertAndFetch({
      id: uuid(),
      sessionUserId: userId,
      scriptId,
      scriptVersionId,
      referrerCode
    })
  }

  private createUser(email: string) {
    return SessionUser.query().insert({
      id: uuid(),
      email
    })
  }

  private getUserByEmail(email: string) {
    return SessionUser.query()
      .where('email', email)
      .first()
  }

  private getSessionProgress(scriptId: string, userId: string) {
    return SessionProgress.query()
      .where('scriptId', scriptId)
      .where('sessionUserId', userId)
      .first()
  }

  deleteSessions(scriptId: string, sessionIds: string[]) {
    return SessionProgress.query()
      .where('scriptId', scriptId)
      .whereIn('id', sessionIds)
      .delete()
  }
}

export default new SessionProgressService()
