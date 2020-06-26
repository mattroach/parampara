import React, { useState } from 'react'
import styled from 'styled-components'
import ElasticField from './ElasticField'

export const ActionBubble = styled.div`
  display: inline-block;
  padding: 5px 13px;
  border-radius: 15px;
  border: 1px solid #006bfa;
  color: #006bfa;
`
type Props = {
  onSubmit: (v: string) => void
  onClear: () => void
}

const ResponseOption: React.FunctionComponent<Props> = ({ onSubmit, onClear }) => {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <ActionBubble>
      <ElasticField
        value={value}
        setValue={setValue}
        onSubmit={onSubmit}
        onClear={onClear}
      />
    </ActionBubble>
  )
}

export default ResponseOption
