import ScriptAdminLayout from 'layout/ScriptAdminLayout'
import React from 'react'
import styled from 'styled-components'
import RequireEmailForm from './RequireEmailForm'
import ShareDetails from './ShareDetails'
import OGConfig from './OGConfig'

type Props = {
  adminId: string
  scriptId: string
}

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const FormSection = styled.div`
  margin-bottom: 48px;
`

const SharePage: React.FunctionComponent<Props> = ({ adminId, scriptId }) => {
  return (
    <ScriptAdminLayout adminId={adminId} scriptId={scriptId}>
      <Wrapper>
        <FormSection>
          <ShareDetails />
        </FormSection>
        <FormSection>
          <RequireEmailForm />
        </FormSection>
        <FormSection>
          <OGConfig />
        </FormSection>
      </Wrapper>
    </ScriptAdminLayout>
  )
}

export default SharePage
