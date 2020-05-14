import React from 'react'
import { useSelector } from 'react-redux'
import Item from './items/Item'
import MainControls from './MainControls'
import EmptyState from './EmptyState'
import styled from 'styled-components'

const Items = styled.div`
  min-height: 250px;
`

const Editor: React.FunctionComponent = () => {
  const items = useSelector(state => state.scriptStore.script!.version.items)

  return (
    <>
      <Items>
        {items.length === 0 && <EmptyState />}
        {items.map((item, i) => (
          <Item item={item} key={item.id} position={i} />
        ))}
      </Items>
      <MainControls />
    </>
  )
}

export default Editor
