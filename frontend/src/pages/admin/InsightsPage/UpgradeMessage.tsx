import React from 'react'
import styled from 'styled-components'
import QuestionBreakdown from './QuestionBreakdown'

const Wrapper = styled.section`
  max-width: var(--breakpoint-xl);
  padding: 0 20px;
`

const UpgradeMessage: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <QuestionBreakdown
        question="This is a pro feature only"
        data={[
          {
            answer: 'if you upgrade you will see real data here',
            numUsers: 12
          },
          {
            answer: 'lorem ipsum',
            numUsers: 54
          },
          {
            answer: 'Lorem Ipsum forever',
            numUsers: 95
          }
        ]}
      />
      <QuestionBreakdown
        question="if you upgrade you will see real data here"
        data={[
          {
            answer: 'if you upgrade you will see real data here',
            numUsers: 32
          },
          {
            answer: 'This is a pro feature only',
            numUsers: 38
          },
          {
            answer: 'Lorem Ipsum is for placeholder',
            numUsers: 43
          }
        ]}
      />
    </Wrapper>
  )
}

export default UpgradeMessage
