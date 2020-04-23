import React from 'react'
import styled from 'styled-components'
import Results from './Results'

type Props = {
  scriptId: string
}

const Wrapper = styled.section`
  margin: 15px auto;
  padding: 0 20px;
`

const ResultsPage: React.FunctionComponent<Props> = ({ scriptId }) => {
  return (
    <Wrapper>
      <Results scriptId={scriptId} />
    </Wrapper>
  )
}

export default ResultsPage
