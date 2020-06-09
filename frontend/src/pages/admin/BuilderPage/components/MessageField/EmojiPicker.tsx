import { EmojiData, Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useRef, useEffect } from 'react'

type Props = {
  onSelect?: (emoji: EmojiData) => void
}

const EmojiPicker: React.FunctionComponent<Props> = ({ onSelect }) => {
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    pickerRef.current!.getElementsByTagName('input')[0].focus()
  }, [])

  return (
    <div ref={pickerRef}>
      <Picker
        style={{ border: 'none' }}
        darkMode={false}
        title="Choose above"
        emoji="point_up"
        native={true}
        onSelect={onSelect}
      />
    </div>
  )
}

export default EmojiPicker
