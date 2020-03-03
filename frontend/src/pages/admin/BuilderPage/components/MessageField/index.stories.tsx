import React, { useState, useRef } from 'react'
import MessageField from '.'
import { action } from '@storybook/addon-actions'

// This must be imported before other components which extend bootstrap styles.:
import 'bootstrap/dist/css/bootstrap.css'
import 'index.css'
import styled from 'styled-components'
import EmojiPicker from './EmojiPicker'

export default {
  title: 'MessageField',
  component: MessageField
}

const Wrapper = styled.div`
  margin: 500px 0 0 50px;
`

export const Basic = () => {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  return (
    <Wrapper>
      <MessageField
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
