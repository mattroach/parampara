import React from 'react'
import styled from 'styled-components'
import ScriptAdminLayout from 'layout/ScriptAdminLayout'

type Props = {
  adminId: string
  scriptId: string
}

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const SharePage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      <Wrapper>Yo share</Wrapper>
    </ScriptAdminLayout>
  )
}

export default SharePage