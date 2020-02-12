import React from 'react'
import styled from 'styled-components'
import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import CopyShareUrl from './CopyShareUrl'
import Form from 'react-bootstrap/Form'

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
      <Wrapper>
        <h4>Share your Parampara</h4>
        <p>Once you're done creating your Parampara, you can share it via the URL below.
          Don't forget to hit the "Publish" button after you make any changes!</p>
        <CopyShareUrl />
        <br />
        <h5>Require email</h5>
        <p>
          If you turn this on, users will be required to provide their email at the start of the Parampara.
          They will be able to resume unfinished Paramparas at a later time, and their emails will be reflected from your results dashboard.
        </p>
        <Form.Check
          type="switch"
          id="require-email"
          label="Require that users provide their email"
        />
      </Wrapper>
    </ScriptAdminLayout>
  )
}

export default SharePage