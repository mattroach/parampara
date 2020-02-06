import React from 'react'
import styled from 'styled-components'
import ScriptAdminLayout from '../../layout/script-admin-layout/ScriptAdminLayout'
import Editor from './editor/Editor'

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
      <Wrapper><Editor /></Wrapper>
    </ScriptAdminLayout>
  )
}

export default BuilderPage