import React from 'react'

import { connect } from 'react-redux'
import { progressItemAndDelayNext } from 'store/slices/sessionProgress'
import { CommentAction, ScriptItem, ScriptActionType } from '../../../../types/scriptTypes'
import TextInput from './TextInput'

type Props = {
  item: ScriptItem
  action: CommentAction
  progressItemAndDelayNext: typeof progressItemAndDelayNext
}

class Comment extends React.Component<Props> {


  handleSubmit = (content: string) => {
    const { item } = this.props

    this.props.progressItemAndDelayNext({
      actionResult: {
        type: ScriptActionType.Comment,
        content
      },
      item
    })

  }

  render() {
    return <TextInput placeholder="Your comment" onSubmit={this.handleSubmit} />
  }
}

// @ts-ignore
export default connect(null, { progressItemAndDelayNext })(Comment)