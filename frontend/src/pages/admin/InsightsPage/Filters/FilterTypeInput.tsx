import React, { useMemo } from 'react'
import { RootState } from 'store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterKey, removeFilter } from 'store/slices/scriptInsights'
import AdvancedSelect from './inputs/AdvancedSelect'
import { InsightFilterType, InsightFilterKey } from 'types/insightTypes'

const FilterTypeInput: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const filterKey = useSelector(
    (state: RootState) => state.scriptInsightsStore.filter.key
  ) as InsightFilterKey<InsightFilterType.Question> | undefined

  const data = useSelector(
    (state: RootState) => state.scriptInsightsStore.unfilteredData!
  )

  const questions = useMemo(() => data.map(i => i.question), [data])

  const onUnset = () => dispatch(removeFilter())
  const onSet = (value: string) =>
    dispatch(
      setFilterKey({
        type: InsightFilterType.Question,
        value
      })
    )

  return (
    <AdvancedSelect
      placeholder="Add a filter..."
      unsetOption="No filter"
      value={filterKey?.value}
      onUnset={onUnset}
      onSet={onSet}
    >
      {questions.map(q => (
        <option key={q}>{q}</option>
      ))}
    </AdvancedSelect>
  )
}

export default FilterTypeInput
