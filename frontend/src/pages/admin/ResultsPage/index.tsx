import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import React from 'react'
import styled from 'styled-components'

type Props = {
  adminId: string
  scriptId: string
}

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const ResultsPage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      <Wrapper>
        <h4>View your results amigo</h4>
        <p>So delightful</p>
      </Wrapper>
    </ScriptAdminLayout>
  )
}

export default ResultsPage