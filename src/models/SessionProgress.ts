import { Model } from 'objection'

export default class SessionProgress extends Model {
  id!: string
  scriptId!: string
  progress!: any
  sessionUserId!: string

  static tableName = 'session_progress'

  static jsonAttributes = ['progress']
}