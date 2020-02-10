import React from 'react'
import Menu from './Menu'
import { NavId, ActionBubble } from '../../items/styles'
import { ResponseChoice } from 'types/scriptTypes'
import styled from 'styled-components'
import InlineEdit from './InlineEdit'

export const ResponseBubble = styled(ActionBubble)`
  box-shadow: 0px 2px 6px #d9d9d9;
`

type Props = {
  position: number
  responsePosition: number
  response: ResponseChoice
}

const ResponseOption: React.FunctionComponent<Props> = ({ position, responsePosition, response }) => {

  const bubbleRef: React.RefObject<HTMLDivElement> = React.createRef()

  return (
    <ResponseBubble ref={bubbleRef} >
      <Menu position={position} responsePosition={responsePosition} />
      <InlineEdit position={position} responsePosition={responsePosition} message={response.message} />
      {response.nextId ? <NavId>{response.nextId}</NavId> : null}
    </ResponseBubble>
  )
}

export default ResponseOption