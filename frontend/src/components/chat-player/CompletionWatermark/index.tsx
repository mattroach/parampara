import api from 'api'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EmailInput from '../components/action-types/EmailInput'
import BotMessage from '../components/item-types/BotMessage'
import HumanBubble from '../components/item-types/HumanBubble'
import CreateParamparaButton from './CreateParamparaButton'
import GoToAccountButton from './GoToAccountButton'
import Message from './Message'
import withDelay, { DelayContent } from './withDelay'

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
              <BotMessage message="To get started, enter your email here." />
              <DelayContent>
                {email === undefined ? (
                  <EmailInput onSubmit={setEmail} />
                ) : (
                  <EmailSubmittedScript email={email} />
                )}
              </DelayContent>
            </DelayContent>
          </>
        )}
      </DelayContent>
    </Wrapper>
  )
}

const EmailSubmittedScript = ({ email }: { email: string }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined)

  useEffect(() => {
    api.createAccount(email).then(setUserId)
  }, [email])

  return (
    <>
      <HumanBubble message={email} />
      {userId && (
        <DelayContent>
          <BotMessage message="Nice, we've sent your account details to your email." />
          <DelayContent>
            <BotMessage message="Happy creating 🎉" />
            <DelayContent>
              <GoToAccountButton userId={userId} />
            </DelayContent>
          </DelayContent>
        </DelayContent>
      )}
    </>
  )
}

export default withDelay(CompletionWatermark, 1.5)
