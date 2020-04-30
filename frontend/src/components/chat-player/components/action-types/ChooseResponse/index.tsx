import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import styled from 'styled-components'
import { ChooseResponseAction, ScriptActionType, ScriptItem } from 'types/scriptTypes'
import ItemWrap from '../../item-types/ItemWrap'
import ResponseButton from './ResponseButton'

const Wrapper = styled(ItemWrap).attrs({
  unlimitedWidth: true
})`
  margin: 30px 0;
  text-align: center;
  width: 100%;
`

type Props = {
  item: ScriptItem
  action: ChooseResponseAction
}

const ChooseResponse: React.FunctionComponent<Props> = ({ action, item }) => {
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (choice: number) => (event: any) => {
    event.preventDefault()

    dispatch(
      progressItemAndDelayNext({
        actionResult: {
          type: ScriptActionType.ChooseResponse,
          choice
        },
        item
      })
    )
    containerRef.current!.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Wrapper ref={containerRef}>
      {action.responses.map((response, i) => (
        <ResponseButton key={i} onClick={handleClick(i)}>
          {response.message}
        </ResponseButton>
      ))}
    </Wrapper>
  )
}

export default ChooseResponse
