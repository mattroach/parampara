import React from 'react'
import styled from 'styled-components'
import Editor from './components/Editor'
import ServerSync from './components/ServerSync'
import withScriptAdminLayout from 'layout/ScriptAdminLayout'

const Wrapper = styled.section`
  margin: 20px auto;
  max-width: 600px;
`

const BuilderPage: React.FunctionComponent = () => {
  return (
    <>
      <ServerSync />
      <Wrapper>
        <Editor />
      </Wrapper>
    </>
  )
}

export default withScriptAdminLayout(BuilderPage)
