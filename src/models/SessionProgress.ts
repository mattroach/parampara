import { Model, RelationMappingsThunk } from 'objection'
import SessionResponse from './SessionResponse'
import ScriptVersion from './ScriptVersion'

export default class SessionProgress extends Model {
  id!: string
  scriptId!: string
  scriptVersionId!: string
  currentItemId!: number
  items!: any
  sessionUserId!: string
  progress!: number
  durationSec!: number
  referrerCode?: string

  responses?: SessionResponse[]
  scriptVersion?: ScriptVersion

  static tableName = 'session_progress'

  static jsonAttributes = ['items']

  static relationMappings: RelationMappingsThunk = () => ({
    responses: {
      relation: Model.HasManyRelation,
      modelClass: SessionResponse,
      join: {
        from: 'session_progress.id',
        to: 'session_response.sessionProgressId'
      }
    },
    scriptVersion: {
      relation: Model.BelongsToOneRelation,
      modelClass: ScriptVersion,
      join: {
        from: 'session_progress.scriptVersionId',
        to: 'script_version.id'
      }
    }
  });
}