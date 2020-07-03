import React from 'react'
import styled from 'styled-components'
import { MultiChoiceAction } from 'types/scriptTypes'
import NewMultiChoiceOption from './NewMutiChoiceOption'
import SavedMultiChoiceOption from './SavedMultiChoiceOption'

const ItemWrap = styled.div`
  margin: 10px 0 40px;
  text-align: right;
`

type Props = {
  action?: MultiChoiceAction // Will be undefined if creating a new option and none exists yet
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
      <SavedMultiChoiceOption
        key={i + response.message}
        position={position}
        responsePosition={i}
        response={response}
      />
    ))}
    <NewMultiChoiceOption
      position={position}
      mode={action ? 'append' : 'new'}
      autoFocus={autoFocus}
    />
  </ItemWrap>
)

export default ChooseResponse
