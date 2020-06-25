import { InsightFilter, InsightFilterType } from '@frontend/types/insightTypes'
import { ScriptActionType } from '@frontend/types/scriptTypes'
import Knex from 'knex'

const buildKnexFilter = <T>(
  query: Knex.QueryBuilder<T>,
  filter: InsightFilter
): Knex.QueryBuilder<T> => {
  if (filter.key.type === InsightFilterType.Question) {
    query
      .innerJoin(
        'sessionResponse AS filterResponse',
        'sessionResponse.sessionProgressId',
        'filterResponse.sessionProgressId'
      )
      .where('filterResponse.responseType', ScriptActionType.ChooseResponse)
      .where('filterResponse.message', filter.key.value)
      .where('filterResponse.response', filter.value.value)
  }

  return query
}

export default buildKnexFilter
