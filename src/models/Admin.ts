import { Model } from 'objection'

export default class Admin extends Model {
  id!: string
  email!: string

  static tableName = 'admin'
}