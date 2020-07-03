import React from 'react'
import styled from 'styled-components'
import { MultiSelectAction } from 'types/scriptTypes'
import NewMultiSelectOption from './NewMutiSelectOption'
import SavedMultiSelectOption from './SavedMultiSelectOption'

const ItemWrap = styled.div`
  margin: 10px 0 40px;
  text-align: right;
`

type Props = {
  action?: MultiSelectAction // Will be undefined if creating a new option and none exists yet
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
      <SavedMultiSelectOption
        key={i + response.message}
        position={position}
        responsePosition={i}
        response={response}
      />
    ))}
    <NewMultiSelectOption
      position={position}
      mode={action ? 'append' : 'new'}
      autoFocus={autoFocus}
    />
  </ItemWrap>
)

export default ChooseResponse
