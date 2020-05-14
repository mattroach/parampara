import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
  const progressLoaded = useSelector(state => !!state.sessionProgressStore.progress)
  const hasWatermark = useSelector(state => state.scriptStore.script!.hasWatermark)
  const [completed, setCompleted] = useState(false)

  return (
    <>
      <UserIdentification isPreviewMode={isPreviewMode} />
      {progressLoaded && <MainScript onComplete={() => setCompleted(true)} />}
      {completed && !isPreviewMode && hasWatermark && <CompletionWatermark />}
      <ScrollBuffer />
    </>
  )
}

export default ChatPlayer
