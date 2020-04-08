import SessionProgress from '../../models/SessionProgress'
import SessionUser from '../../models/SessionUser'
import { SendEmailAction } from '../../../frontend/src/types/scriptTypes'
import sendEmailActionService from '../SendEmailActionService'
import sessionResponseService from '../SessionResponseService'

export default async function handleSendEmail(
  session: SessionProgress,
  action: SendEmailAction
) {
  let sessionEmail
  if (session.sessionUserId) {
    const sessionUser = await SessionUser.query().findById(session.sessionUserId)
    sessionEmail = sessionUser.email
  } else {
    const response = await sessionResponseService.getLastEmailCollected(session.id)
    if (response) {
      sessionEmail = response.response
    }
  }

  if (sessionEmail) {
    await sendEmailActionService.sendEmail(session.scriptId, {
      content: action.content,
      sessionEmail
    })
  } else {
    console.warn('Could not find an email')
  }
}
