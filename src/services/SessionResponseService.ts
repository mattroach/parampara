import { uuid } from '@shared'
import { ChooseResponseAction, ScriptActionType, ScriptItem, ScriptItemType } from 'frontend/src/types/scriptTypes'
import { ProgressItem } from 'frontend/src/types/sessionProgress'
import SessionResponse from 'src/models/SessionResponse'
import SessionProgress from '../models/SessionProgress'
import Objection = require('objection')

class SessionResponseService {
  async saveNewResponses(lastSession: SessionProgress, scriptVersionId: string, items: ProgressItem[]) {
    const prevPosition = lastSession.items.length // TODO should store in the table instead?

    items.slice(prevPosition)
      .forEach(async (item, i) => {
        if (!item.actionResult) return

        const itemIndex = i + prevPosition

        if (item.actionResult.type === ScriptActionType.ChooseResponse) {
          const action = item.item.action as ChooseResponseAction
          if (action.responses.length === 1) {
            // If there is only one response choice, skip storing the data for it - we don't care about it
            return
          }

          await this.saveResponse(lastSession, scriptVersionId, {
            itemIndex,
            responseType: 'choice',
            message: this.getItemMessage(item.item),
            response: action.responses[item.actionResult.choice].message
          })
        } else {
          await this.saveResponse(lastSession, scriptVersionId, {
            itemIndex,
            responseType: 'comment',
            message: this.getItemMessage(item.item),
            response: item.actionResult.content
          })
        }
      })
  }

  private async saveResponse(
    lastSession: SessionProgress,
    scriptVersionId: string,
    data: Objection.PartialModelObject<SessionResponse>
  ) {
    return await SessionResponse.query().insert({
      ...data,
      id: uuid(),
      sessionProgressId: lastSession.id,
      sessionUserId: lastSession.sessionUserId,
      scriptId: lastSession.scriptId,
      scriptVersionId
    })
  }

  private getItemMessage(item: ScriptItem) {
    if (item.type === ScriptItemType.Image)
      return 'Giphy'
    else
      return item.message
  }

}

export default new SessionResponseService()