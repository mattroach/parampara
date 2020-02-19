import { Model, RelationMappingsThunk } from 'objection'
import SessionResponse from './SessionResponse'

export default class SessionProgress extends Model {
  id!: string
  scriptId!: string
  scriptVersionId!: string
  currentItemId!: number
  items!: any
  sessionUserId!: string

  responses?: SessionResponse[]

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
    }
  });
}