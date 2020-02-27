import React from 'react'
import styled from 'styled-components'
import { ChooseResponseAction } from 'types/scriptTypes'
import NewResponseOption from './NewResponseOption'
import ResponseOption from './ResponseOption'

const ItemWrap = styled.div`
  margin: 10px 0 40px;
  text-align: right;
`

type Props = {
  action?: ChooseResponseAction // Will be undefined if creating a new option and none exists yet
  position: number
}

const ChooseResponse: React.FunctionComponent<Props> = ({ action, position }) => {
  return (
    <ItemWrap>
      {action &&
        action.responses.map((response, i) => {
          return (
            <ResponseOption
              key={i + response.message}
              position={position}
              responsePosition={i}
              response={response}
            />
          )
        })}

      <NewResponseOption
        position={position}
        mode={action ? 'append' : 'create'}
        autoFocus={!action}
      />
    </ItemWrap>
  )
}

export default ChooseResponse
