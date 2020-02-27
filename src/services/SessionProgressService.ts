import { uuid } from '@shared'
import SessionProgress from '../models/SessionProgress'
import SessionUser from '../models/SessionUser'
import sessionResponseService from './SessionResponseService'
import ScriptVersion from '../models/ScriptVersion'

class SessionProgressService {
  async updateSessionProgress(sessionId: string, currentItemId: number, items: any[]) {
    const session = await SessionProgress.query().findById(sessionId)

    if (!session) throw Error(`session ID ${sessionId} not found`)

    await sessionResponseService.saveNewResponses(session, items)

    await SessionProgress.query()
      .findById(sessionId)
      .patch({
        currentItemId,
        items,
        progress: await this.getProgress(currentItemId, session)
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

        return await this.createSessionProgress(scriptId, { userId: user.id, referrerCode })
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
    const scriptVersionId = scriptVersion[0].id

    return await SessionProgress.query().insertAndFetch({
      id: uuid(),
      sessionUserId: userId,
      scriptId,
      scriptVersionId,
      referrerCode
    })
  }

  private async createUser(email: string) {
    return await SessionUser.query().insert({
      id: uuid(),
      email
    })
  }

  private async getUserByEmail(email: string) {
    return (await SessionUser.query().where('email', email))[0]
  }

  private async getSessionProgress(scriptId: string, userId: string) {
    return (
      await SessionProgress.query()
        .where('scriptId', scriptId)
        .where('sessionUserId', userId)
    )[0]
  }
}

export default new SessionProgressService()
