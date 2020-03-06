import axios from 'axios'
import Admin from '../models/Admin'
import Script from '../models/Script'

export enum RequestType {
  AccountCreated = 'ACCOUNT_CREATED',
  ScriptPublished = 'SCRIPT_PUBLISHED'
}

type BaseRequest = {
  data: {
    email: string
    accountUrl: string
  }
}

type AccountCreationRequest = BaseRequest & {
  type: RequestType.AccountCreated
}

type ScriptPublishedRequest = BaseRequest & {
  type: RequestType.ScriptPublished
  data: BaseRequest['data'] & {
    script: {
      title: string
      shareUrl: string
      editorUrl: string
    }
  }
}

const ENDPOINT = 'https://ueda9botb3.execute-api.ap-southeast-2.amazonaws.com/stage'
const BASE_URL = 'https://app.getparampara.com'

class EmailService {
  async accountCreated(admin: Admin) {
    const request: AccountCreationRequest = {
      ...this.createBaseRequest(admin),
      type: RequestType.AccountCreated
    }
    this.sendRequest(request)
  }

  async scriptPublished(admin: Admin, script: Script) {
    const baseRequest = this.createBaseRequest(admin)
    const request: ScriptPublishedRequest = {
      ...baseRequest,
      type: RequestType.ScriptPublished,
      data: {
        ...baseRequest.data,
        script: {
          title: script.title,
          shareUrl: `${BASE_URL}/s/${script.id}`,
          editorUrl: `${BASE_URL}/builder/${admin.id}/${script.id}/create`
        }
      }
    }
    this.sendRequest(request)
  }

  private createBaseRequest(admin: Admin): BaseRequest {
    return {
      data: {
        email: admin.email,
        accountUrl: `${BASE_URL}/u/${admin.id}`
      }
    }
  }

  private sendRequest(request: AccountCreationRequest | ScriptPublishedRequest) {
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

export default new EmailService()
