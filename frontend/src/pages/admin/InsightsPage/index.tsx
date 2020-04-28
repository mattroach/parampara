import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loadScriptInsights } from 'store/slices/scriptInsights'
import { RootState } from 'store/rootReducer'
import Loader from 'components/Loader'
import QuestionBreakdown from './QuestionBreakdown'
import Filters from './Filters'
import { usePrevious } from 'hooks/usePrevious'

const Wrapper = styled.section`
  max-width: var(--breakpoint-xl);
  padding: 0 20px;
`

const Results = styled.div<{ isLoading: boolean }>`
  opacity: ${props => (props.isLoading ? '0.3' : 1)};
  transition: opacity ${props => (props.isLoading ? '0.25' : '0.1')}s ease-in-out;
`

const InsightsPage: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.scriptInsightsStore.filter)
  const prev = usePrevious({ filter })

  useEffect(() => {
    // If no previous filter or the filter value has changed
    if (!prev || prev.filter?.value !== filter?.value) {
      dispatch(loadScriptInsights())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, dispatch])

  const insights = useSelector((state: RootState) => state.scriptInsightsStore.data)
  const isLoadingData = useSelector(
    (state: RootState) => state.scriptInsightsStore.isLoadingData
  )

  if (!insights) {
    return <Loader />
  }

  return (
    <Wrapper>
      <Filters />
      <Results isLoading={isLoadingData}>
        {insights.map(insight => (
          <QuestionBreakdown key={insight.question} {...insight} />
        ))}
      </Results>
    </Wrapper>
  )
}

export default InsightsPage
