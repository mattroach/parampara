import { EmojiData, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React from 'react'

type Props = {
  onSelect?: (emoji: EmojiData) => void
}

const EmojiPicker: React.FunctionComponent<Props> = ({ onSelect }) => {
  return (
    <Picker
      style={{ border: 'none' }}
      darkMode={false}
      title="Choose above"
      emoji="point_up"
      native={true}
      onSelect={onSelect}
    />
  )
}

export default EmojiPicker
