import { uuid } from '@shared'
import SessionProgress from '../models/SessionProgress'
import SessionUser from '../models/SessionUser'
import progressItemExecutor from './ProgressItemExecutor'
import ScriptVersion from '../models/ScriptVersion'
import eventService from './eventService'

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

    await progressItemExecutor.execute(session, data.items, session.items.length)

    await SessionProgress.query()
      .findById(sessionId)
      .patch({
        ...data,
        progress: await this.getProgress(
          data.currentItemId,
          await session.$relatedQuery('scriptVersion')
        )
      })
  }

  private async getProgress(currentItemId: number, scriptVersion: ScriptVersion) {
    return Math.floor((100 * currentItemId) / scriptVersion.items.length)
  }

  async createSessionProgress(
    scriptId: string,
    data: {
      email?: string
      referrerCode?: string
      currentItemId: number
      items: any[]
      durationSec: number
    }
  ): Promise<SessionProgress> {
    const { email, ...progressData } = data

    if (email) {
      const user = await this.getUserByEmail(email)

      if (user) {
        return await this.createSessionProgressDb(scriptId, {
          userId: user.id,
          ...progressData
        })
      }

      const newUser = await this.createUser(email)
      return await this.createSessionProgressDb(scriptId, {
        userId: newUser.id,
        ...progressData
      })
    }
    return await this.createSessionProgressDb(scriptId, progressData)
  }

  private async createSessionProgressDb(
    scriptId: string,
    data: {
      userId?: string
      referrerCode?: string
      currentItemId: number
      items: any[]
      durationSec: number
    }
  ) {
    const scriptVersion = await ScriptVersion.query()
      .where('scriptId', scriptId)
      .modify('latest')
      .first()
    const scriptVersionId = scriptVersion.id

    const { userId: sessionUserId, ...moreData } = data

    const newProgress = await SessionProgress.query().insertAndFetch({
      id: uuid(),
      sessionUserId,
      scriptId,
      scriptVersionId,
      progress: await this.getProgress(data.currentItemId, scriptVersion),
      ...moreData
    })

    await progressItemExecutor.execute(newProgress, data.items, 0)

    eventService.newRespondent(scriptId)
    return newProgress
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

  deleteSessions(scriptId: string, sessionIds: string[]) {
    return SessionProgress.query()
      .where('scriptId', scriptId)
      .whereIn('id', sessionIds)
      .delete()
  }
}

export default new SessionProgressService()
