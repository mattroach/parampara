import RootContainer from 'layout/RootContainer'
import React from 'react'
import styled from 'styled-components'
import Filters from './Filters'
import QuestionInsights from './QuestionInsights'
import CommentInsights from './CommentInsights'

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

const Insights: React.FunctionComponent = () => (
  <>
    <Filters />
    <RootContainer>
      <Heading id="questions">Multiple choice responses</Heading>
      <QuestionInsights />
      <Heading id="comments">Comments</Heading>
      <CommentInsights />
    </RootContainer>
  </>
)

export default Insights
