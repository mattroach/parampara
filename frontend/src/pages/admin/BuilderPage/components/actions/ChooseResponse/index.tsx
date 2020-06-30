import React from 'react'
import styled from 'styled-components'
import { ChooseResponseAction } from 'types/scriptTypes'
import NewResponseOption from './NewResponseOption'
import SavedResponseOption from './SavedResponseOption'

const ItemWrap = styled.div`
  margin: 10px 0 40px;
  text-align: right;
`

type Props = {
  action?: ChooseResponseAction // Will be undefined if creating a new option and none exists yet
  position: number
  autoFocus?: boolean
}

const ChooseResponse: React.FunctionComponent<Props> = ({
  action,
  position,
  autoFocus
}) => (
  <ItemWrap>
    {action?.responses.map((response, i) => (
      <SavedResponseOption
        key={i + response.message}
        position={position}
        responsePosition={i}
        response={response}
      />
    ))}
    <NewResponseOption
      position={position}
      mode={action ? 'append' : 'new'}
      autoFocus={autoFocus}
    />
  </ItemWrap>
)

export default ChooseResponse
