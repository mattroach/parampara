import { Model, RelationMappingsThunk } from 'objection';

import ScriptVersion from './ScriptVersion';

export default class Script extends Model {
  id!: string
  adminId!: string
  latestVersion?: ScriptVersion

  static tableName = 'script'

  static relationMappings: RelationMappingsThunk = () => ({
    latestVersion: {
      relation: Model.HasOneRelation,
      modelClass: ScriptVersion,
      join: {
        from: 'script.id',
        to: 'script_version.scriptId'
      },
      modify: builder => builder.where('version', '!=', ScriptVersion.DRAFT_VERSION)
    }
  });
}