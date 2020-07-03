import { Session, SessionResponse } from '../api/types'

export type SessionWithKeyedResponses = {
  responseByMessage: {
    [message: string]: SessionResponse | SessionResponse[] // it may be an array for multi-choice
  }
} & Session

export type TransposedResponses = {
  sessions: SessionWithKeyedResponses[]
  columns: string[]
}

const transposeSessionResults = (sessions: Session[]): TransposedResponses => {
  const columns = new Set<string>()

  const transposedSessions = sessions.map(session => {
    const newSession: SessionWithKeyedResponses = {
      ...session,
      responseByMessage: {}
    }
    session.responses.forEach(response => {
      columns.add(response.message)

      if (response.message in newSession.responseByMessage) {
        // For multi-choice: If the item is already in the list, convert it to an array and append the item
        const existing = newSession.responseByMessage[response.message]

        if (Array.isArray(existing)) {
          existing.push(response)
        } else {
          newSession.responseByMessage[response.message] = [existing, response]
        }
      } else {
        newSession.responseByMessage[response.message] = response
      }
    })
    return newSession
  })

  return {
    columns: Array.from(columns),
    sessions: transposedSessions
  }
}

export default transposeSessionResults
