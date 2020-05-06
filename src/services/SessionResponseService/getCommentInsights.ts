import { InsightFilter } from '../../../frontend/src/types/insightTypes'
import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import SessionResponse from '../../models/SessionResponse'
import buildKnexFilter from './buildKnexFilter'
import Objection = require('objection')

type Insight = {
  question: string
  data: {
    created: string
    answer: string
  }[]
}

type InsightMap = {
  [question: string]: Insight
}

type RawData = {
  message: string
  response: string
  created: string
}[]

const getData = (scriptId: string, filter?: InsightFilter): Promise<RawData> => {
  const q = SessionResponse.knexQuery()
    .select(
      'sessionResponse.message',
      'sessionResponse.created',
      'sessionResponse.response'
    )
    .where('sessionResponse.scriptId', scriptId)
    .where('sessionResponse.responseType', '!=', ScriptActionType.ChooseResponse)
    .orderBy('sessionResponse.message', 'DESC')
    .orderBy('sessionResponse.created', 'DESC')

  if (filter) {
    buildKnexFilter(q, filter)
  }

  return q
}

const getCommentInsights = async (
  scriptId: string,
  filter?: InsightFilter
): Promise<Insight[]> => {
  const data = await getData(scriptId, filter)

  const insightMap: InsightMap = {}

  data.forEach(dataItem => {
    if (insightMap[dataItem.message]) {
      insightMap[dataItem.message].data.push({
        answer: dataItem.response,
        created: dataItem.created
      })
    } else {
      insightMap[dataItem.message] = {
        question: dataItem.message,
        data: [
          {
            answer: dataItem.response,
            created: dataItem.created
          }
        ]
      }
    }
  })

  return Object.values(insightMap)
}

export default getCommentInsights
