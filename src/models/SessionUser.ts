import { Model } from 'objection'

export default class SessionUser extends Model {
  
  id!: string
  email!: string

  static tableName = 'session_user'

}