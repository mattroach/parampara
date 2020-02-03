import { Model } from 'objection'

export default class ScriptVersion extends Model {
  static tableName = 'script_version'

  static jsonAttributes = ['items']

  static DRAFT_VERSION = 0;
}