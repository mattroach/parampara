import { Model, Modifiers, RelationMappingsThunk } from 'objection';

import ScriptVersion from './ScriptVersion';

export default class Script extends Model {
  id!: string
  adminId!: string
  version?: ScriptVersion

  static tableName = 'script'

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