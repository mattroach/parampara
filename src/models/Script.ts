import { Model, Modifiers, RelationMappingsThunk } from 'objection'

import ScriptVersion from './ScriptVersion'
import Admin from './Admin'

export default class Script extends Model {
  id!: string
  adminId!: string
  title!: string
  reportingEmail!: string
  allowAnon!: boolean
  hasUnpublishedChanges!: boolean

  metaImgUrl!: string | null
  metaImgWidth!: number | null
  metaImgHeight!: number | null
  metaTitle!: string | null
  metaDescription!: string | null

  version?: ScriptVersion
  admin?: Admin

  static tableName = 'script'

  // static get jsonSchema() {
  //   return {
  //     type: 'object',

  //     properties: {
  //       title: { type: 'string' }
  //     }
  //   }
  // }

  static modifiers: Modifiers = {}

  static relationMappings: RelationMappingsThunk = () => ({
    version: {
      relation: Model.HasOneRelation,
      modelClass: ScriptVersion,
      join: {
        from: 'script.id',
        to: 'script_version.scriptId'
      }
    },
    admin: {
      relation: Model.BelongsToOneRelation,
      modelClass: Admin,
      join: {
        from: 'script.adminId',
        to: 'admin.id'
      }
    }
  })
}
