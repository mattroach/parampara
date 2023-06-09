import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFilterValue, setFilterValue } from 'store/slices/scriptInsights'
import AdvancedSelect from 'components/AdvancedSelect'
import { InsightFilterType, InsightFilterKey } from 'types/insightTypes'

type Props = {
  filterKey: InsightFilterKey<InsightFilterType.Question>
}

const AnswerInput: React.FunctionComponent<Props> = ({ filterKey }) => {
  const dispatch = useDispatch()

  const filterValue = useSelector(state => state.scriptInsightsStore.filter.value)

  const onUnset = () => dispatch(removeFilterValue())
  const onSet = (value: string) => dispatch(setFilterValue({ value }))

  const data = useSelector(state => state.scriptInsightsStore.unfilteredQuestionData!)

  const answers = useMemo(
    () => data.find(q => q.question === filterKey.value)!.data.map(d => d.answer),
    [filterKey, data]
  )

  return (
    <AdvancedSelect
      placeholder="Add a filter value..."
      unsetOption="Do not filter"
      value={filterValue?.value}
      onUnset={onUnset}
      onSet={onSet}
    >
      {answers.map(a => (
        <option key={a} value={a}>
          {a}
        </option>
      ))}
    </AdvancedSelect>
  )
}

export default AnswerInput
