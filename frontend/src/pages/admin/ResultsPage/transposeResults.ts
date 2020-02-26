import { Session, SessionResponse } from "api/types"

type SessionWithKeyedResponses = {
  responseByMessage: { [message: string]: SessionResponse }
} & Session

type ReturnType = {
  sessions: SessionWithKeyedResponses[]
  columns: string[]
}

const transposeResults = (sessions: Session[]): ReturnType => {
  const columns: any = {}

  const transposedSessions = sessions.map(session => {
    const newSession: SessionWithKeyedResponses = {
      ...session,
      responseByMessage: {}
    }
    session.responses.forEach(response => {
      columns[response.message] = true

      newSession.responseByMessage[response.message] = response
    })
    return newSession
  })

  return {
    columns: Object.keys(columns),
    sessions: transposedSessions
  }
}

export default transposeResults