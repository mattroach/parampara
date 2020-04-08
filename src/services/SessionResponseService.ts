import SessionProgress from '../models/SessionProgress'
import Objection = require('objection')
import SessionResponse from '../models/SessionResponse'
import { ScriptActionType } from '../../frontend/src/types/scriptTypes'

class SessionResponseService {
  async getSessionsWithResponses(scriptId: string) {
    return await SessionProgress.query()
      .select('id', 'sessionUserId', 'created', 'progress', 'durationSec', 'referrerCode')
      .withGraphFetched('[responses, sessionUser]')
      .where('scriptId', scriptId)
      .where('progress', '!=', 0)
      .orderBy('created', 'DESC')
  }

  getLastEmailCollected(sessionId: string) {
    return SessionResponse.query()
      .where('sessionProgressId', sessionId)
      .where('responseType', ScriptActionType.CollectEmail)
      .orderBy('created', 'DESC')
      .first()
  }
}

export default new SessionResponseService()
