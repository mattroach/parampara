import SessionUser from '../../models/SessionUser'
import { InsightFilter } from '../../../frontend/src/types/insightTypes'
import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import buildKnexFilter from './buildKnexFilter'
import Objection = require('objection')

type RawData = {
  email: string
}[]

const getData = (
  scriptId: string,
  question: string,
  answer: string,
  filter?: InsightFilter
): Promise<RawData> => {
  const q = SessionUser.knexQuery()
    .select('sessionUser.email')
    .innerJoin('sessionResponse', 'sessionResponse.sessionUserId', 'sessionUser.id')
    .where('sessionResponse.scriptId', scriptId)
    .where('sessionResponse.responseType', ScriptActionType.ChooseResponse)
    .where('sessionResponse.message', question)
    .where('sessionResponse.response', answer)

  if (filter) {
    buildKnexFilter(q, filter)
  }

  return q
}

const getQuestionInsightUsers = async (
  scriptId: string,
  question: string,
  answer: string,
  filter?: InsightFilter
): Promise<string[]> => {
  const data = await getData(scriptId, question, answer, filter)

  return data.map(d => d.email)
}

export default getQuestionInsightUsers
