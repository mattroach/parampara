import { Model, Modifiers } from 'objection'

export default class ScriptVersion extends Model {
  id!: string
  scriptId!: string
  version!: number
  items!: any

  static tableName = 'script_version'

  static jsonAttributes = ['items']

  static DRAFT_VERSION = 0

  static modifiers: Modifiers = {
    latest(builder) {
      builder
        .where('version', '!=', ScriptVersion.DRAFT_VERSION)
        .orderBy('version', 'desc')
        .first()
    },
    draft(builder) {
      builder.where('version', ScriptVersion.DRAFT_VERSION).first()
    }
  }
}
