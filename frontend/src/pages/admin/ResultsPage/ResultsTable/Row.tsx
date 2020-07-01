import dayjs from 'dayjs'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import DurationFormatted from './DurationFormatted'
import ProgressBar from './ProgressBar'
import { SessionWithKeyedResponses } from '../../../../services/transposeSessionResults'
import { Select } from './Selection'
import { SessionResponse } from 'api/types'
import styled from 'styled-components'

type Props = {
  session: SessionWithKeyedResponses
  hasUsers: boolean
  hasReferrers: boolean
  extraCols: string[]
}
const Row = ({ extraCols, session, hasUsers, hasReferrers }: Props) => (
  <tr>
    <td>
      <Select sessionId={session.id} />
    </td>
    <td>{dayjs(session.created).format('DD MMM YYYY, h:mma')}</td>
    <td>
      <ProgressBar progress={session.progress} />
    </td>
    <td>
      <DurationFormatted durationSec={session.durationSec} />
    </td>
    {hasUsers && <td>{session.sessionUser?.email}</td>}
    {hasReferrers && (
      <td>
        <Badge variant="secondary">{session.referrerCode}</Badge>
      </td>
    )}
    {extraCols.map((column, i) => (
      <td key={i}>
        {session.responseByMessage[column] && (
          <Responses responses={session.responseByMessage[column]} />
        )}
      </td>
    ))}
  </tr>
)

const Responses = ({ responses }: { responses: SessionResponse | SessionResponse[] }) => {
  if (Array.isArray(responses)) {
    return (
      <>
        {responses.map((r, i) => (
          <ResponseItem key={i}>{r.response}</ResponseItem>
        ))}
      </>
    )
  } else {
    return <>{responses.response}</>
  }
}

const ResponseItem = styled.span`
  border-radius: 4px;
  background: #eee;
  padding: 2px 4px;
  margin-right: 4px;
`

export default Row
