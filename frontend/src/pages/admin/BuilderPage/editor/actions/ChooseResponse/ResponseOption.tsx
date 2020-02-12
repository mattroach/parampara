import React from 'react'
import Menu from './Menu'
import { NavId, ActionBubble } from '../../items/styles'
import { ResponseChoice } from 'types/scriptTypes'
import styled from 'styled-components'
import InlineEdit from './InlineEdit'

export const ResponseBubble = styled(ActionBubble)`
  box-shadow: 0px 2px 6px #d9d9d9;
  transition: box-shadow 0.15s ease-in-out;

  :focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); 
  }
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
      <Menu response={response} position={position} responsePosition={responsePosition} containerRef={bubbleRef} />
      <InlineEdit position={position} responsePosition={responsePosition} message={response.message} />
      {response.nextId ? <NavId>{response.nextId}</NavId> : null}
    </ResponseBubble>
  )
}

export default ResponseOption