import SessionProgress from '@models/SessionProgress'
import Objection = require('objection')
import SessionResponse from '@models/SessionResponse'
import { ScriptActionType } from '@frontend/types/scriptTypes'
import getResponseStatistics from './getResponseStatistics'
import getQuestionInsights from './getQuestionInsights'
import getCommentInsights from './getCommentInsights'
import getQuestionInsightUsers from './getQuestionInsightUsers'

class SessionResponseService {
  getSessionsWithResponses(scriptId: string) {
    return SessionProgress.query()
      .select('id', 'sessionUserId', 'created', 'progress', 'durationSec', 'referrerCode')
      .withGraphFetched('[responses, sessionUser]')
      .where('scriptId', scriptId)
      .orderBy('created', 'DESC')
  }

  getResponseStatistics = getResponseStatistics

  getQuestionInsights = getQuestionInsights
  getQuestionInsightUsers = getQuestionInsightUsers
  getCommentInsights = getCommentInsights

  getLastEmailCollected(sessionId: string) {
    return SessionResponse.query()
      .where('sessionProgressId', sessionId)
      .where('responseType', ScriptActionType.CollectEmail)
      .orderBy('created', 'DESC')
      .first()
  }
}

export default new SessionResponseService()
