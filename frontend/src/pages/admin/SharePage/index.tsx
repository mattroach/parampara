import React from 'react'
import styled from 'styled-components'
import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import CopyShareUrl from './CopyShareUrl'
import RequireEmailForm from './RequireEmailForm'

type Props = {
  adminId: string
  scriptId: string
}

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const StyledCopyShareUrl = styled(CopyShareUrl)`
  margin-bottom: 24px;
`

const SharePage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      <Wrapper>
        <h4>Share your Parampara</h4>
        <p>Once you're done creating your Parampara, you can share it via the URL below.
          Don't forget to hit the "Publish" button after you make any changes!</p>
        <StyledCopyShareUrl />
        <RequireEmailForm />
      </Wrapper>
    </ScriptAdminLayout>
  )
}

export default SharePage