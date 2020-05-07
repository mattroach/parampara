import { InsightFilter } from '../../../frontend/src/types/insightTypes'
import { ScriptActionType } from '../../../frontend/src/types/scriptTypes'
import SessionResponse from '../../models/SessionResponse'
import buildKnexFilter from './buildKnexFilter'
import Objection = require('objection')

type Insight = {
  question: string
  data: InsightAnswer[]
}

type InsightAnswer = {
  created: string
  answer: string
  sessionProgressId: string
  peers: PeerMap
}

type PeerMap = {
  [question: string]: string
}

type RawData = {
  question: string
  answer: string
  sessionProgressId: string
  created: string
  peerMessage: string | null
  peerResponse: string | null
}

const getData = (scriptId: string, filter?: InsightFilter): Promise<RawData[]> => {
  const q = SessionResponse.knexQuery()
    .select(
      'sessionResponse.message as question',
      'sessionResponse.sessionProgressId',
      'sessionResponse.response as answer',
      'sessionResponse.created',
      'peer.message AS peerMessage',
      'peer.response AS peerResponse'
    )
    .leftJoin('sessionResponse AS peer', function() {
      this.on('sessionResponse.sessionProgressId', 'peer.sessionProgressId').andOn(
        'sessionResponse.id',
        '!=',
        'peer.id'
      )
    })
    .where('sessionResponse.scriptId', scriptId)
    .where('sessionResponse.responseType', '!=', ScriptActionType.ChooseResponse)
    // The ordering below is critical for the grouping algorithm to work
    .orderBy('sessionResponse.message', 'DESC')
    .orderBy('sessionResponse.sessionProgressId', 'DESC')
    .orderBy('sessionResponse.created', 'DESC')

  if (filter) {
    buildKnexFilter(q, filter)
  }

  return q
}

const getCommentInsights = async (
  scriptId: string,
  filter?: InsightFilter
): Promise<Insight[]> => {
  const data = await getData(scriptId, filter)

  const insights: Insight[] = []
  let lastInsight: Insight | undefined = undefined
  let lastAnswer: InsightAnswer | undefined = undefined

  data.forEach(row => {
    if (row.question === lastInsight?.question) {
      if (row.sessionProgressId === lastAnswer!.sessionProgressId) {
        lastAnswer!.peers[row.peerMessage!] = row.peerResponse!
      } else {
        lastAnswer = createInsightAnswer(row)
        lastInsight.data.push(lastAnswer)
      }
    } else {
      lastAnswer = createInsightAnswer(row)
      lastInsight = {
        question: row.question,
        data: [lastAnswer]
      }
      insights.push(lastInsight)
    }
  })
  return insights
}

const createInsightAnswer = (row: RawData): InsightAnswer => {
  const peers: PeerMap = {}

  if (row.peerMessage && row.peerResponse) {
    peers[row.peerMessage] = row.peerResponse
  }

  const { created, answer, sessionProgressId } = row
  return {
    created,
    answer,
    sessionProgressId,
    peers
  }
}

export default getCommentInsights
