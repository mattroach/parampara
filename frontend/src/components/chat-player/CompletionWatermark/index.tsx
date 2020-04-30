import React, { useState } from 'react'
import styled from 'styled-components'
import Message from './Message'
import withDelay, { DelayContent } from './withDelay'
import CreateParamparaButton from './CreateParamparaButton'
import HumanBubble from '../components/item-types/HumanBubble'
import BotMessage from '../components/item-types/BotMessage'
import EmailInput from '../components/action-types/EmailInput'
import CreateAccount from './CreateAccount'

const Wrapper = styled.div`
  margin-top: 80px;
`

const CompletionWatermark: React.FunctionComponent = () => {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState<string | undefined>(undefined)

  return (
    <Wrapper>
      <Message />
      <DelayContent>
        {!showForm ? (
          <CreateParamparaButton onClick={() => setShowForm(true)} />
        ) : (
          <>
            <HumanBubble message="Create a Parampara" />
            <DelayContent>
              <BotMessage message="Great! Enter your email to get started!" />
              <DelayContent>
                {email === undefined ? (
                  <EmailInput onSubmit={setEmail} />
                ) : (
                  <>
                    <HumanBubble message={email} />
                    <DelayContent>
                      <BotMessage message="Creating your free account now..." />
                      <DelayContent>
                        <CreateAccount email={email} />
                      </DelayContent>
                    </DelayContent>
                  </>
                )}
              </DelayContent>
            </DelayContent>
          </>
        )}
      </DelayContent>
    </Wrapper>
  )
}

export default withDelay(CompletionWatermark)
