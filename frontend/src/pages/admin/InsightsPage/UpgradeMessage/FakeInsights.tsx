import React from 'react'
import styled from 'styled-components'
import QuestionBreakdown from '../QuestionBreakdown'

const Wrapper = styled.div`
  filter: blur(4px);
  padding-top: 60px;
`

const FakeInsights: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <QuestionBreakdown
        question="This is a pro feature only"
        data={[
          {
            answer: 'Lorem Ipsum dolor sit',
            numUsers: 95
          },
          {
            answer: 'lorem ipsum',
            numUsers: 54
          },
          {
            answer: 'if you upgrade you will see real insights here',
            numUsers: 12
          }
        ]}
      />
      <QuestionBreakdown
        question="if you upgrade you will see real data here"
        data={[
          {
            answer: 'Lorem Ipsum is for placeholder',
            numUsers: 43
          },
          {
            answer: 'This is a pro feature only',
            numUsers: 38
          },
          {
            answer: 'if you upgrade you will see your insights here',
            numUsers: 32
          }
        ]}
      />
      <QuestionBreakdown
        question="This is a pro feature only"
        data={[
          {
            answer: 'Lorem Ipsum dolor sit',
            numUsers: 95
          },
          {
            answer: 'lorem ipsum',
            numUsers: 54
          },
          {
            answer: 'if you upgrade you will see real insights here',
            numUsers: 12
          }
        ]}
      />
    </Wrapper>
  )
}

export default FakeInsights
