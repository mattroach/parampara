import SessionProgress from '../../models/SessionProgress'
import Objection = require('objection')
import SessionResponse from '../../models/SessionResponse'
import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import knex from '../../knex'

const getSessionAggregations = (scriptId: string) =>
  SessionProgress.knexQuery()
    .select(
      knex.raw('count(*) filter (where progress = 100) as completed'),
      knex.raw('count(*) as all'),
      knex.raw('sum(duration_sec) as time')
    )
    .where('scriptId', scriptId)
    .then(r => ({
      completed: Number(r[0].completed),
      all: Number(r[0].all),
      totalTimeSec: Number(r[0].time)
    }))

type ResponseStatsKnexReturn = {
  responseType: typeof scriptActionsForAggregation[number]
  count: string
}[]

const scriptActionsForAggregation = [
  ScriptActionType.Comment,
  ScriptActionType.ChooseResponse
] as const

type ScriptActionCounts = {
  [ScriptActionType.Comment]?: number
  [ScriptActionType.ChooseResponse]?: number
}

const getResponseAggregations = (scriptId: string) =>
  SessionResponse.knexQuery()
    .select('responseType')
    .where('scriptId', scriptId)
    .whereIn('responseType', scriptActionsForAggregation as any)
    .groupBy('responseType')
    .count()
    .then((results: ResponseStatsKnexReturn) => {
      const transformed: ScriptActionCounts = {}
      results.forEach(item => {
        transformed[item.responseType] = Number(item.count)
      })
      return transformed
    })

type ResponseStatistics = {
  numSessions: number
  numComments: number
  numQuestions: number
  numCompleted: number
  totalTimeSec: number
}

const getResponseStatistics = async (scriptId: string): Promise<ResponseStatistics> => {
  const sessionAggregations = await getSessionAggregations(scriptId)
  const responseAggregations = await getResponseAggregations(scriptId)

  return {
    numSessions: sessionAggregations.all,
    numComments: responseAggregations.Comment || 0,
    numQuestions: responseAggregations.ChooseResponse || 0,
    numCompleted: sessionAggregations.completed,
    totalTimeSec: sessionAggregations.totalTimeSec
  }
}

export default getResponseStatistics