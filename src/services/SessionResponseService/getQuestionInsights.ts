import { InsightFilter } from '../../../frontend/src/types/insightTypes'
import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import knex from '../../knex'
import SessionResponse from '../../models/SessionResponse'
import buildKnexFilter from './buildKnexFilter'
import Objection = require('objection')

type Insight = {
  question: string
  data: {
    answer: string
    numUsers: number
  }[]
}

type InsightMap = {
  [question: string]: Insight
}

type QuestionInsights = Insight[]

type RawData = {
  message: string
  response: string
  count: string
}[]

const getData = (scriptId: string, filter?: InsightFilter): Promise<RawData> => {
  const q = SessionResponse.knexQuery()
    .select(
      'sessionResponse.message',
      'sessionResponse.response',
      knex.raw('count(distinct session_response.id) as count')
    )
    .where('sessionResponse.scriptId', scriptId)
    .where('sessionResponse.responseType', ScriptActionType.ChooseResponse)
    .orderBy('count', 'DESC')
    .groupBy('sessionResponse.message', 'sessionResponse.response')

  if (filter) {
    buildKnexFilter(q, filter)
  }

  return q
}

const getQuestionInsights = async (
  scriptId: string,
  filter?: InsightFilter
): Promise<QuestionInsights> => {
  const data = await getData(scriptId, filter)

  const insightMap: InsightMap = {}

  data.forEach(dataItem => {
    if (insightMap[dataItem.message]) {
      insightMap[dataItem.message].data.push({
        answer: dataItem.response,
        numUsers: Number(dataItem.count)
      })
    } else {
      insightMap[dataItem.message] = {
        question: dataItem.message,
        data: [
          {
            answer: dataItem.response,
            numUsers: Number(dataItem.count)
          }
        ]
      }
    }
  })

  return Object.values(insightMap)
}

export default getQuestionInsights
