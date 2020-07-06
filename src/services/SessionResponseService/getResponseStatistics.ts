import SessionProgress from '@models/SessionProgress'
import Objection = require('objection')
import SessionResponse from '@models/SessionResponse'
import { ScriptActionType } from '@frontend/types/scriptTypes'
import { ResponseStatistics } from '@frontend/api/types'
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
  ScriptActionType.ChooseResponse,
  ScriptActionType.MultiSelect
] as const

type ScriptActionCounts = {
  [ScriptActionType.Comment]?: number
  [ScriptActionType.ChooseResponse]?: number
  [ScriptActionType.MultiSelect]?: number
}

const getResponseAggregations = (scriptId: string) =>
  SessionResponse.knexQuery()
    .select('responseType')
    .where('scriptId', scriptId)
    .whereIn('responseType', scriptActionsForAggregation as any)
    .groupBy('responseType')
    .countDistinct('sessionProgressId') // Must count distinct so there are no multi-counts for multi-select
    .then((results: ResponseStatsKnexReturn) => {
      const transformed: ScriptActionCounts = {}
      results.forEach(item => {
        transformed[item.responseType] = Number(item.count)
      })
      return transformed
    })

const getResponseStatistics = async (scriptId: string): Promise<ResponseStatistics> => {
  const sessionAggregations = await getSessionAggregations(scriptId)
  const responseAggregations = await getResponseAggregations(scriptId)

  return {
    numSessions: sessionAggregations.all,
    numComments: responseAggregations.Comment || 0,
    numQuestions:
      (responseAggregations.ChooseResponse || 0) +
      (responseAggregations.MultiSelect || 0),
    numCompleted: sessionAggregations.completed,
    totalTimeSec: sessionAggregations.totalTimeSec
  }
}

export default getResponseStatistics
