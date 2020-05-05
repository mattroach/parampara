import Loader from 'components/Loader'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadScriptQuestionInsights } from 'store/slices/scriptInsights'
import styled from 'styled-components'
import Filters from './Filters'
import QuestionInsights from './QuestionInsights'

const Wrapper = styled.section`
  max-width: var(--breakpoint-xl);
  padding: 0 20px;
`

const Heading = styled.h4`
  margin: 1rem 0;

  /* This is a hack so the anchor links work with the floating header */
  /* https://css-tricks.com/hash-tag-links-padding/ */
  ::before {
    display: block;
    content: ' ';
    margin-top: -150px;
    height: 150px;
    visibility: hidden;
    pointer-events: none;
  }
`

const Insights: React.FunctionComponent = () => {
  const insights = useSelector(
    (state: RootState) => state.scriptInsightsStore.questionData
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadScriptQuestionInsights())
  }, [dispatch])

  if (!insights) {
    return <Loader />
  }

  return (
    <Wrapper>
      <Filters />
      <Heading id="questions">Multiple choice responses</Heading>
      <QuestionInsights />
      <Heading id="comments">Comments</Heading>
      <p>Comment insights coming soon!</p>
    </Wrapper>
  )
}

export default Insights
