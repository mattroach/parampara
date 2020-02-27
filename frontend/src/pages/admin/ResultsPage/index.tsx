import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import React from 'react'
import styled from 'styled-components'
import Results from './Results'

type Props = {
  adminId: string
  scriptId: string
}

const Wrapper = styled.section`
  margin: 20px auto;
  padding: 0 20px;
`

const ResultsPage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      <Wrapper>
        <h4>Results</h4>
        <Results scriptId={scriptId} />
      </Wrapper>
    </ScriptAdminLayout>
  )
}

export default ResultsPage
