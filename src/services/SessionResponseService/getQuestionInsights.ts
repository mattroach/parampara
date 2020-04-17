import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import knex from '../../knex'
import SessionResponse from '../../models/SessionResponse'
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

const getData = (scriptId: string): Promise<RawData> =>
  SessionResponse.knexQuery()
    .select('message', 'response', knex.raw('count(*) as count'))
    .where('scriptId', scriptId)
    .where('responseType', ScriptActionType.ChooseResponse)
    .orderBy('count', 'DESC')
    .groupBy('message', 'response')

const getQuestionInsights = async (scriptId: string): Promise<QuestionInsights> => {
  const data = await getData(scriptId)

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
