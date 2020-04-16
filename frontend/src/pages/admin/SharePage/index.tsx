import React from 'react'
import styled from 'styled-components'
import RequireEmailForm from './RequireEmailForm'
import ShareDetails from './ShareDetails'
import OGConfig from './OGConfig'
import withScriptAdminLayout from 'layout/ScriptAdminLayout'

const Wrapper = styled.section`
  margin: 25px auto;
  max-width: 600px;
`

const FormSection = styled.div`
  margin-bottom: 48px;
`

const SharePage: React.FunctionComponent = () => {
  return (
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
  )
}

export default withScriptAdminLayout(SharePage)
