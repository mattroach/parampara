import { Model } from 'objection'

export type ResponseType = 'choice' | 'comment'

export default class SessionResponse extends Model {
  id!: string
  sessionProgressId!: string
  sessionUserId!: string
  scriptId!: string
  scriptVersionId!: string
  itemIndex!: number
  responseType!: ResponseType
  message!: string
  response!: string

  static tableName = 'session_response'
}