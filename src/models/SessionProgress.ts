import { Model } from 'objection'

export default class SessionProgress extends Model {
  id!: string
  scriptId!: string
  items!: any
  sessionUserId!: string

  static tableName = 'session_progress'

  static jsonAttributes = ['items']
}