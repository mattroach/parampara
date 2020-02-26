import { Model, RelationMappingsThunk } from 'objection'
import SessionResponse from './SessionResponse'
import ScriptVersion from './ScriptVersion'
import SessionUser from './SessionUser'

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

  sessionUser?: SessionUser
  responses?: SessionResponse[]
  scriptVersion?: ScriptVersion

  static tableName = 'session_progress'

  static jsonAttributes = ['items']

  static relationMappings: RelationMappingsThunk = () => ({
    sessionUser: {
      relation: Model.HasOneRelation,
      modelClass: SessionUser,
      join: {
        from: 'session_progress.sessionUserId',
        to: 'session_user.id'
      }
    },
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