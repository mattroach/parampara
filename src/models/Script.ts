import { Model, Modifiers, RelationMappingsThunk } from 'objection'

import ScriptVersion from './ScriptVersion'

export default class Script extends Model {
  id!: string
  adminId!: string
  reportingEmail!: string
  allowAnon!: boolean
  hasUnpublishedChanges!: boolean
  version?: ScriptVersion

  static tableName = 'script'

  // static get jsonSchema() {
  //   return {
  //     type: 'object',

  //     properties: {
  //       title: { type: 'string' }
  //     }
  //   }
  // }

  static modifiers: Modifiers = {

  }


  static relationMappings: RelationMappingsThunk = () => ({
    version: {
      relation: Model.HasOneRelation,
      modelClass: ScriptVersion,
      join: {
        from: 'script.id',
        to: 'script_version.scriptId'
      }
    }
  });
}