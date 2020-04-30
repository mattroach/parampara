import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'
import UserIdentification from './components/UserIdentification'
import MainScript from './MainScript'
import CompletionWatermark from './CompletionWatermark'

const ScrollBuffer = styled.div`
  height: 200px;
`

type Props = {
  isPreviewMode: boolean
}

const ChatPlayer: React.FunctionComponent<Props> = ({ isPreviewMode }) => {
  const progressLoaded = useSelector(
    (state: RootState) => !!state.sessionProgressStore.progress
  )
  const [completed, setCompleted] = useState(false)

  return (
    <>
      <UserIdentification isPreviewMode={isPreviewMode} />
      {progressLoaded && <MainScript onComplete={() => setCompleted(true)} />}
      {completed && !isPreviewMode && <CompletionWatermark />}
      <ScrollBuffer />
    </>
  )
}

export default ChatPlayer
