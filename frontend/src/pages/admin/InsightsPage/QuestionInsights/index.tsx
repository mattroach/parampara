import Loader from 'components/Loader'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadScriptQuestionInsights } from 'store/slices/scriptInsights'
import styled from 'styled-components'
import QuestionBreakdown from './QuestionBreakdown'

const Results = styled.div<{ isLoading: boolean }>`
  opacity: ${props => (props.isLoading ? '0.3' : 1)};
  transition: opacity ${props => (props.isLoading ? '0.25' : '0.1')}s ease-in-out;
`

const QuestionInsights: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(
    (state: RootState) => state.scriptInsightsStore.filter?.value
  )

  useEffect(() => {
    dispatch(loadScriptQuestionInsights())
  }, [filterValue, dispatch])

  const insights = useSelector(
    (state: RootState) => state.scriptInsightsStore.questionData
  )
  const isLoadingData = useSelector(
    (state: RootState) => state.scriptInsightsStore.isLoadingData
  )

  if (!insights) {
    return <Loader />
  }

  return (
    <Results isLoading={isLoadingData}>
      {insights.map(insight => (
        <QuestionBreakdown key={insight.question} {...insight} />
      ))}
    </Results>
  )
}

export default QuestionInsights
