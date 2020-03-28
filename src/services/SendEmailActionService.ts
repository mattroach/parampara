import axios from 'axios'
import scriptService from './ScriptService'

export enum RequestType {
  SendEmail = 'SEND_EMAIL'
}

type SendEmailRequest = {
  type: RequestType.SendEmail
  data: {
    adminEmail: string
    sessionEmail: string
    scriptTitle: string
    content: string
  }
}

const ENDPOINT = 'https://9qnle1zz0k.execute-api.ap-southeast-2.amazonaws.com/stage'

class SendEmailActionService {
  async sendEmail(
    scriptId: string,
    { content, sessionEmail }: { content: string; sessionEmail: string }
  ) {
    const script = await scriptService.getScript(scriptId).withGraphFetched('admin')

    const request: SendEmailRequest = {
      type: RequestType.SendEmail,
      data: {
        scriptTitle: script.title,
        adminEmail: script.admin!.email,
        content,
        sessionEmail
      }
    }
    this.sendRequest(request)
  }

  private sendRequest(request: SendEmailRequest) {
    if (process.env.NODE_ENV === 'development') {
      console.log(request)
    } else {
      // Send in async, do not wait for response
      axios
        .post(ENDPOINT, request)
        .then(response => console.log('Response from email service:', response.data))
    }
  }
}

export default new SendEmailActionService()
