import React from 'react'
import Menu from './Menu'
import { NavId, ActionBubble, BubbleBase } from '../../items/styles'
import { ResponseChoice } from 'types/scriptTypes'
import styled from 'styled-components'
import InlineEdit from './InlineEdit'

const StyledBubbleBase = styled(BubbleBase)`
  margin: 0 0 4px 4px;
  box-shadow: 0px 2px 6px #d9d9d9;
`

const StyledNavId = styled(NavId)`
  margin-left: 8px;
`

type Props = {
  position: number
  responsePosition: number
  response: ResponseChoice
}

const ResponseOption: React.FunctionComponent<Props> = ({ position, responsePosition, response }) => {
  const bubbleRef: React.RefObject<HTMLDivElement> = React.createRef()

  return (
    <StyledBubbleBase ref={bubbleRef}>
      <Menu response={response} position={position} responsePosition={responsePosition} containerRef={bubbleRef} />
      <ActionBubble>
        <InlineEdit position={position} responsePosition={responsePosition} message={response.message} />
        {response.nextId ? <StyledNavId>{response.nextId}</StyledNavId> : null}
      </ActionBubble>
    </StyledBubbleBase>
  )
}

export default ResponseOption