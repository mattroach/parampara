import { Model } from 'objection'
import { ScriptActionType } from '../../frontend/src/types/scriptTypes'

export default class SessionResponse extends Model {
  id!: string
  sessionProgressId!: string
  sessionUserId!: string
  scriptId!: string
  responseType!: ScriptActionType
  message!: string
  response!: string
  created!: string

  static tableName = 'session_response'
}
