import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Item from './Item'
import MainControls from './MainControls'


const Editor: React.FunctionComponent = () => {
  const items = useSelector((state: RootState) => state.scriptStore.script?.version.items)

  if (!items)
    throw Error('Items not loaded')

  return (
    <>
      {items.map((item, i) =>
        <Item item={item} key={i} position={i} />
      )}
      <MainControls />
    </>
  )
}

export default Editor