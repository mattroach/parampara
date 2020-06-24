import publishMailchimpEvent from './publishMailchimpEvent'
import emailService from '../EmailService'
import Admin from '../../models/Admin'
import Script from '../../models/Script'
import SessionProgress from '../../models/SessionProgress'

type ScriptAttributes = {
  scriptTitle: string
  scriptId: string
}

export default {
  async newRespondent(scriptId: string) {
    const thresholds = [10, 50, 100]

    const countResult = (await SessionProgress.query()
      .where('scriptId', scriptId)
      .count()
      .as('count')) as any

    const count = parseInt(countResult[0].count)
    if (!thresholds.includes(count)) return

    const script = await Script.query()
      .withGraphFetched('admin')
      .findById(scriptId)

    const scriptAttributes: ScriptAttributes = {
      scriptTitle: script.title,
      scriptId
    }

    publishMailchimpEvent(
      script.admin!.email,
      'total_respondents_' + count,
      scriptAttributes
    )
  },
  scriptPublished(admin: Admin, script: Script) {
    emailService.scriptPublished(admin, script)

    const scriptAttributes: ScriptAttributes = {
      scriptTitle: script.title,
      scriptId: script.id
    }
    publishMailchimpEvent(admin.email, 'publish_script', scriptAttributes)
  }
}
