import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getNextItem } from 'store/slices/sessionProgress'
import ProgressedItem from './components/ProgressedItem'
import NextItem from './components/NextItem'

type Props = {
  onComplete: () => void
}

const MainScript: React.FunctionComponent<Props> = ({ onComplete }) => {
  const progressItems = useSelector(state => state.sessionProgressStore.progress!.items)
  const nextItem = useSelector(getNextItem)

  useEffect(() => {
    if (nextItem === undefined) {
      onComplete()
    }
  }, [nextItem, onComplete])

  return (
    <>
      {progressItems.map((progressItem, i) => (
        <ProgressedItem key={i} progressItem={progressItem} />
      ))}
      {nextItem && <NextItem item={nextItem} />}
    </>
  )
}

export default MainScript
