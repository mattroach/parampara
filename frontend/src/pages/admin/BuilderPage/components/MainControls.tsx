import React from 'react'
import styled from 'styled-components'

import BotControls from './BotControls'
import HumanControls from './HumanControls'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

const Wrapper = styled.div`
  border-top: 2px solid #eee;
  padding-top: 8px;
  margin-top: 50px;
`

const MainControls: React.FunctionComponent = () => {
  const isScriptEmpty = useSelector(
    (state: RootState) => state.scriptStore.script!.version.items.length === 0
  )

  const canAddActionToLastItem = useSelector((state: RootState) => {
    const { items } = state.scriptStore.script!.version
    const lastItem = items[items.length - 1]
    return lastItem && !lastItem.action
  })

  const scrollDown = () => {
    // We need to delay it, as when the item is first added, the new render hasn't actually happened yet.
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 1)
  }

  return (
    <Wrapper>
      <BotControls onAddItem={scrollDown} autoFocus={isScriptEmpty} />
      {canAddActionToLastItem && <HumanControls onAddItem={scrollDown} />}
    </Wrapper>
  )
}

export default MainControls
