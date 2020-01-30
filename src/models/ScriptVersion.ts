import { Model } from 'objection'

export default class ScriptVersion extends Model {
  static tableName = 'script_version'

  static jsonAttributes = ['content']

  static DRAFT_VERSION = 0;
}