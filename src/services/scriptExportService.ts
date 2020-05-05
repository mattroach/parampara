import stringify, { Stringifier } from 'csv-stringify'
import { Writable } from 'stream'
import urlSlug from 'url-slug'
import Script from '../models/Script'
import SessionProgress from '../models/SessionProgress'
import sessionResponseService from './SessionResponseService'
import transposeSessionResults from '../../frontend/src/services/transposeSessionResults'
import { Session } from '../../frontend/src/api/types'

class ScriptExportService {
  async getFilename(scriptId: string) {
    const script = await Script.query().findById(scriptId)
    return urlSlug(script.title)
  }
  async asCSV(scriptId: string, writeStream: Writable) {
    const stringifier = stringify()
    stringifier.on('readable', function() {
      let row
      while ((row = stringifier.read())) {
        writeStream.write(row, 'utf8')
      }
    })
    stringifier.on('error', function(err) {
      console.error(err.message)
    })
    stringifier.on('finish', function() {
      writeStream.end()
    })

    const sessions = await sessionResponseService.getSessionsWithResponses(scriptId)
    this.writeSessions(sessions, stringifier)
    stringifier.end()
  }

  private writeSessions(sessions: SessionProgress[], stringifier: Stringifier) {
    const BASE_HEADERS = [
      'Date',
      'Progress (%)',
      'Duration [seconds]',
      'User',
      'Referrer'
    ]
    const transposedResults = transposeSessionResults(sessions)
    stringifier.write(BASE_HEADERS.concat(transposedResults.columns))

    transposedResults.sessions.forEach(s => {
      const extraCols = transposedResults.columns.map(
        col => s.responseByMessage[col]?.response
      )

      const b = this.getBaseData(s)
      stringifier.write([b.date, b.progress, b.duration, b.user, b.ref].concat(extraCols))
    })
  }

  private getBaseData(session: Session) {
    return {
      date: new Date(session.created).toISOString(),
      progress: session.progress,
      duration: session.durationSec,
      user: session.sessionUser?.email,
      ref: session.referrerCode
    }
  }
}

export default new ScriptExportService()
