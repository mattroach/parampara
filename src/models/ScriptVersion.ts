import { Model } from 'objection'

export default class ScriptVersion extends Model {
  id!: string
  scriptId!: string
  version!: number
  reportingEmail!: string
  
  static tableName = 'script_version'

  static jsonAttributes = ['items']

  static DRAFT_VERSION = 0;
}