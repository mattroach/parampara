import React, { useMemo } from 'react'
import AdvancedSelect from 'components/AdvancedSelect'
import getPeerQuestions from './getPeerQuestions'
import { CommentInsightAnswer } from 'api/types'

type Props = {
  data: CommentInsightAnswer[]
  value?: string
  setValue: (val: string | undefined) => void
}

const ExtraColPicker: React.FunctionComponent<Props> = ({ data, value, setValue }) => {
  const questions = useMemo(() => getPeerQuestions(data), [data])

  return (
    <AdvancedSelect
      placeholder="Add column..."
      unsetOption="None"
      value={value}
      onUnset={() => setValue(undefined)}
      onSet={setValue}
    >
      {questions.map(a => (
        <option key={a}>{a}</option>
      ))}
    </AdvancedSelect>
  )
}

export default ExtraColPicker
