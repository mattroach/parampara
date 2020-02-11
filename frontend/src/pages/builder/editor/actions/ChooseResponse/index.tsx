import React from 'react'
import styled from 'styled-components'
import { ChooseResponseAction } from 'types/scriptTypes'
import NewResponseOption from './NewResponseOption'
import ResponseOption from './ResponseOption'

const ItemWrap = styled.div`
  margin: 20px 0;
  text-align: right;
`

type Props = {
  action?: ChooseResponseAction // Will be undefined if creating a new option and none exists yet
  position: number
}

const ChooseResponse: React.FunctionComponent<Props> = ({ action, position }) => {

  return (
    <ItemWrap>
      <NewResponseOption
        position={position}
        mode={action ? 'append' : 'create'}
        autoFocus={!action} />

      {action && action.responses.map((response, i) => {
        return <ResponseOption key={i + response.message} position={position} responsePosition={i} response={response} />
      })}

    </ItemWrap>
  )

}

export default ChooseResponse