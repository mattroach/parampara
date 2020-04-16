import React from 'react'
import styled from 'styled-components'
import withScriptAdminLayout from 'layout/ScriptAdminLayout'

const Wrapper = styled.section`
  margin: 15px auto;
  padding: 0 20px;
`

const InsightsPage: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <h2>Response insights</h2>
    </Wrapper>
  )
}

export default withScriptAdminLayout(InsightsPage)
