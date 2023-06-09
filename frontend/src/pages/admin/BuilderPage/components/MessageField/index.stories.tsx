import React, { useState, useRef } from 'react'
import MessageField from '.'
import { action } from '@storybook/addon-actions'

import styled from 'styled-components'
import EmojiPicker from './EmojiPicker'

export default {
  title: 'MessageField',
  component: MessageField
}

const Wrapper = styled.div`
  margin: 500px 0 0 50px;
`

export const Bot = () => <Basic theme="bot" />
export const Response = () => <Basic theme="response" />

const Basic = ({ theme }: { theme: 'bot' | 'response' }) => {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  return (
    <Wrapper>
      <MessageField
        theme={theme}
        inputRef={ref}
        value={value}
        onChange={setValue}
        onSubmit={action('onSubmit')}
        onBlur={action('onBlur')}
      />
    </Wrapper>
  )
}

export const TheEmojiPicker = () => <EmojiPicker onSelect={action('onSelect')} />
