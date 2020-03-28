import { uuid } from '@shared'
import SessionUser from 'src/models/SessionUser'
import {
  ChooseResponseAction,
  ScriptActionType,
  ScriptItem,
  ScriptItemType
} from '../../frontend/src/types/scriptTypes'
import { ProgressItem } from '../../frontend/src/types/sessionProgress'
import SessionProgress from '../models/SessionProgress'
import SessionResponse from '../models/SessionResponse'
import sendEmailActionService from './SendEmailActionService'
import Objection = require('objection')

class SessionResponseService {
  async getSessionsWithResponses(scriptId: string) {
    return await SessionProgress.query()
      .select('id', 'sessionUserId', 'created', 'progress', 'durationSec', 'referrerCode')
      .withGraphFetched('[responses, sessionUser]')
      .where('scriptId', scriptId)
      .where('progress', '!=', 0)
      .orderBy('created', 'DESC')
  }

  async saveNewResponses(lastSession: SessionProgress, items: ProgressItem[]) {
    // TODO should store in the table instead? but the items are probs deserialized anyways?
    const prevPosition = lastSession.items.length

    items.slice(prevPosition).forEach(async (item, i) => {
      if (item.item.action?.type === ScriptActionType.SendEmail) {
        // Todo  should move elsewhere
        if (!lastSession.sessionUserId) throw Error('User is anonymous')
        const sessionUser = await SessionUser.query().findById(lastSession.sessionUserId)
        await sendEmailActionService.sendEmail(lastSession.scriptId, {
          content: item.item.action.content,
          sessionEmail: sessionUser.email
        })
      }

      if (!item.actionResult) return

      if (item.actionResult.type === ScriptActionType.ChooseResponse) {
        const action = item.item.action as ChooseResponseAction
        if (action.responses.length === 1) {
          // If there is only one response choice, skip storing the data for it - we don't care about it
          return
        }

        await this.saveResponse(lastSession, {
          responseType: item.actionResult.type,
          message: this.getItemMessage(item.item),
          response: action.responses[item.actionResult.choice].message
        })
      } else if (item.actionResult.type === ScriptActionType.Comment) {
        await this.saveResponse(lastSession, {
          responseType: item.actionResult.type,
          message: this.getItemMessage(item.item),
          response: item.actionResult.content
        })
      }
    })
  }

  private async saveResponse(
    lastSession: SessionProgress,
    data: Objection.PartialModelObject<SessionResponse>
  ) {
    return await SessionResponse.query().insert({
      ...data,
      id: uuid(),
      sessionProgressId: lastSession.id,
      sessionUserId: lastSession.sessionUserId,
      scriptId: lastSession.scriptId
    })
  }

  private getItemMessage(item: ScriptItem) {
    if (item.type === ScriptItemType.Image) return `(image) ${item.title}`
    else return item.message
  }
}

export default new SessionResponseService()
