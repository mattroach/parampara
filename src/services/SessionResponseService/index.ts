import SessionProgress from '../../models/SessionProgress'
import Objection = require('objection')
import SessionResponse from '../../models/SessionResponse'
import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import getResponseStatistics from './getResponseStatistics'

class SessionResponseService {
  getSessionsWithResponses(scriptId: string) {
    return SessionProgress.query()
      .select('id', 'sessionUserId', 'created', 'progress', 'durationSec', 'referrerCode')
      .withGraphFetched('[responses, sessionUser]')
      .where('scriptId', scriptId)
      .where('progress', '!=', 0)
      .orderBy('created', 'DESC')
  }

  getResponseStatistics = getResponseStatistics

  getLastEmailCollected(sessionId: string) {
    return SessionResponse.query()
      .where('sessionProgressId', sessionId)
      .where('responseType', ScriptActionType.CollectEmail)
      .orderBy('created', 'DESC')
      .first()
  }
}

export default new SessionResponseService()
