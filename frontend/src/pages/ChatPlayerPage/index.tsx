import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadScript } from 'store/slices/script'
import { ScriptVersionType } from 'api/types'
import ChatPlayer from 'components/chat-player/ChatPlayer'
import * as styles from './ChatPlayerPage.styles'

type Props = {
  scriptId: string
}

const ChatSessionPage: React.FunctionComponent<Props> = ({ scriptId }) => {
  const dispatch = useDispatch()
  const scriptLoaded = useSelector((state: RootState) => state.scriptStore.script)

  useEffect(() => {
    dispatch(loadScript(scriptId, ScriptVersionType.latest))
  })

  return (
    <styles.Wrapper>
      {scriptLoaded && <ChatPlayer isPreviewMode={false} />}
    </styles.Wrapper>
  )
}

export default ChatSessionPage
