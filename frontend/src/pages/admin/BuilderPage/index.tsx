import React from 'react'
import styled from 'styled-components'
import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import Editor from './components/Editor'
import ServerSync from './components/ServerSync'

type Props = {
  adminId: string
  scriptId: string
}


const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const BuilderPage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      <ServerSync />
      <Wrapper><Editor /></Wrapper>
    </ScriptAdminLayout>
  )
}

export default BuilderPage