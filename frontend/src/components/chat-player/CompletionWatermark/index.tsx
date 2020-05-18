import React from 'react'
import styled from 'styled-components'
import CreateParamparaButton from './CreateParamparaButton'
import Message from './Message'
import withDelay, { DelayContent } from './withDelay'

const Wrapper = styled.div`
  margin-top: 80px;
`

const CompletionWatermark: React.FunctionComponent = () => {
  const register = () => {
    window.location.href = '/login'
  }

  return (
    <Wrapper>
      <Message />
      <DelayContent>
        <CreateParamparaButton onClick={register} />
      </DelayContent>
    </Wrapper>
  )
}

export default withDelay(CompletionWatermark, 1.5)
