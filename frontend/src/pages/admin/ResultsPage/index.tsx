import React from 'react'
import styled from 'styled-components'
import Results from './Results'

const Wrapper = styled.section`
  margin: 15px auto;
  padding: 0 20px;
`

const ResultsPage: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Results />
    </Wrapper>
  )
}

export default ResultsPage
