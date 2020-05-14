import Loader from 'components/Loader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadScriptQuestionInsights } from 'store/slices/scriptInsights'
import styled from 'styled-components'
import QuestionBreakdown from './QuestionBreakdown'
import { AppDispatch } from 'store/store'

const Results = styled.div<{ isLoading: boolean }>`
  opacity: ${props => (props.isLoading ? '0.3' : 1)};
  transition: opacity ${props => (props.isLoading ? '0.25' : '0.1')}s ease-in-out;
`

const QuestionInsights: React.FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const filterValue = useSelector(state => state.scriptInsightsStore.filter?.value)

  useEffect(() => {
    setIsLoading(true)
    dispatch(loadScriptQuestionInsights()).then(() => setIsLoading(false))
  }, [filterValue, dispatch])

  const insights = useSelector(state => state.scriptInsightsStore.questionData)

  if (!insights) {
    return <Loader />
  }

  return (
    <Results isLoading={isLoading}>
      {insights.map(insight => (
        <QuestionBreakdown key={insight.question} {...insight} />
      ))}
    </Results>
  )
}

export default QuestionInsights
