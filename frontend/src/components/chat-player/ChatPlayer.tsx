import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import NextItem from './components/NextItem'
import ProgressedItem from './components/ProgressedItem'
import UserIdentification from './components/UserIdentification'

type Props = {
  isPreviewMode: boolean
} & ReturnType<typeof mapStateToProps>

class ChatPlayer extends React.Component<Props> {

  render() {
    const { progress, nextItem, isPreviewMode } = this.props

    return (
      <>
        <UserIdentification isPreviewMode={isPreviewMode} />
        {progress && progress.items.map((progressItem, i) => <ProgressedItem key={i} progressItem={progressItem} />)}
        {progress && nextItem && <NextItem item={nextItem} />}
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  const { progress } = state.sessionProgressStore
  const { script } = state.scriptStore

  if (!script)
    throw Error('Script not loaded')

  let nextItem
  if (progress) {
    nextItem = script.version.items[progress.currentItemId]
  }

  return { progress, nextItem }
}

export default connect(mapStateToProps, {})(ChatPlayer)