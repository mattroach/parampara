import publishMailchimpEvent from './publishMailchimpEvent'
import emailService from '../EmailService'
import Admin from '../../models/Admin'
import Script from '../../models/Script'

type ScriptAttributes = {
  scriptTitle: string
  scriptId: string
}

export default {
  nRespondents(userEmail: string, n: number, scriptAttributes: ScriptAttributes) {
    publishMailchimpEvent(userEmail, 'total_respondents_' + n, scriptAttributes)
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
