import dayjs from 'dayjs'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import DurationFormatted from './DurationFormatted'
import ProgressBar from './ProgressBar'
import { SessionWithKeyedResponses } from '../transposeResults'
import { Select } from './Selection'

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
      <td key={i}>{session.responseByMessage[column]?.response}</td>
    ))}
  </tr>
)

export default Row
