import SessionProgress from '../models/SessionProgress'
import Objection = require('objection')

class SessionResponseService {
  async getSessionsWithResponses(scriptId: string) {
    return await SessionProgress.query()
      .select('id', 'sessionUserId', 'created', 'progress', 'durationSec', 'referrerCode')
      .withGraphFetched('[responses, sessionUser]')
      .where('scriptId', scriptId)
      .where('progress', '!=', 0)
      .orderBy('created', 'DESC')
  }
}

export default new SessionResponseService()
