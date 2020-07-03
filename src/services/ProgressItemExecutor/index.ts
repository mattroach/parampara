import { uuid } from '@shared'
import {
  ChooseResponseAction,
  CollectEmailAction,
  CommentAction,
  ScriptActionType,
  ScriptItem,
  ScriptItemType,
  ScriptActionMap,
  MultiSelectAction
} from '@frontend/types/scriptTypes'
import {
  ChooseResponseResult,
  CollectEmailResult,
  CommentResult,
  ProgressItem,
  ScriptActionResultMap,
  MultiSelectResult
} from '@frontend/types/sessionProgress'
import SessionProgress from '@models/SessionProgress'
import SessionResponse from '@models/SessionResponse'
import Objection = require('objection')
import handleSendEmail from './handleSendEmail'

type ExecutorMap = {
  readonly [s in ScriptActionType]: (
    session: SessionProgress,
    action: ScriptActionMap[s],
    item: ScriptItem,
    actionResult: ScriptActionResultMap[s]
  ) => Promise<void>
}

class ProgressItemExecutor {
  private executorMap: ExecutorMap = {
    [ScriptActionType.SendEmail]: handleSendEmail,
    [ScriptActionType.ChooseResponse]: this.handleChooseResponse.bind(this),
    [ScriptActionType.MultiSelect]: this.handleMultiSelect.bind(this),
    [ScriptActionType.Comment]: this.handleComment.bind(this),
    [ScriptActionType.CollectEmail]: this.handleComment.bind(this)
  }

  async execute(session: SessionProgress, items: ProgressItem[], lastItemLength: number) {
    const newItems = items.slice(lastItemLength)

    newItems.forEach(async progressItem => {
      if (!progressItem.item.action) return

      const { type } = progressItem.item.action
      const executor = this.executorMap[type]

      await executor(
        session,
        // @ts-ignore: todo fix
        progressItem.item.action,
        progressItem.item,
        progressItem.actionResult
      )
    })
  }

  private async handleChooseResponse(
    session: SessionProgress,
    action: ChooseResponseAction,
    item: ScriptItem,
    actionResult: ChooseResponseResult
  ) {
    if (action.responses.length === 1) {
      // If there is only one response choice, skip storing the data for it - we don't care about it
      return
    }

    await this.saveResponse(session, {
      responseType: actionResult.type,
      message: this.getItemMessage(item),
      response: action.responses[actionResult.choice].message
    })
  }

  private async handleMultiSelect(
    session: SessionProgress,
    action: MultiSelectAction,
    item: ScriptItem,
    actionResult: MultiSelectResult
  ) {
    actionResult.choices.forEach(
      async choice =>
        await this.saveResponse(session, {
          responseType: actionResult.type,
          message: this.getItemMessage(item),
          response: action.responses[choice].message
        })
    )
  }

  private async handleComment(
    session: SessionProgress,
    action: CommentAction | CollectEmailAction,
    item: ScriptItem,
    actionResult: CommentResult | CollectEmailResult
  ) {
    const { content } = actionResult

    if (content === '') return

    await this.saveResponse(session, {
      responseType: actionResult.type,
      message: this.getItemMessage(item),
      response: content
    })
  }

  private async saveResponse(
    session: SessionProgress,
    data: Objection.PartialModelObject<SessionResponse>
  ) {
    return await SessionResponse.query().insert({
      ...data,
      id: uuid(),
      sessionProgressId: session.id,
      sessionUserId: session.sessionUserId,
      scriptId: session.scriptId
    })
  }

  private getItemMessage(item: ScriptItem) {
    if (item.type === ScriptItemType.Image) return `(image) ${item.title}`
    else return item.message
  }
}

export default new ProgressItemExecutor()
