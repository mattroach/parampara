import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterKey, removeFilter, getQuestions } from 'store/slices/scriptInsights'
import AdvancedSelect from '../../../../components/AdvancedSelect'
import { InsightFilterType, InsightFilterKey } from 'types/insightTypes'

const FilterTypeInput: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const filterKey = useSelector(state => state.scriptInsightsStore.filter.key) as
    | InsightFilterKey<InsightFilterType.Question>
    | undefined

  const questions = useSelector(state => getQuestions(state.scriptInsightsStore))

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
      {questions?.map(q => (
        <option key={q} value={q}>
          {q}
        </option>
      ))}
    </AdvancedSelect>
  )
}

export default FilterTypeInput
