import React from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'
import { TransposedResponses } from '../transposeResults'
import ColumnHeader from './ColumnHeader'
import Row from './Row'
import { SelectAll } from './Selection'

type Props = {
  data: TransposedResponses
}
const StyledTable = styled(({ extraCols: number, ...rest }) => <Table {...rest} />)`
  margin: 15px 0 0 0;
  font-size: 0.85rem;
  line-height: normal;
  min-width: ${props => 300 + props.extraCols * 150}px;

  th,
  td {
    padding: 0.45rem;
  }

  thead th {
    vertical-align: top;
  }
  tbody td {
    :first-of-type {
      white-space: nowrap;
    }
  }
`

const ResultsTable: React.FunctionComponent<Props> = ({ data }) => {
  const hasUsers = useSelector((state: RootState) => !state.scriptStore.script!.allowAnon)

  const { sessions, columns } = data

  const hasReferrers = !!sessions.find(e => e.referrerCode)

  return (
    <StyledTable responsive hover bordered extraCols={columns.length}>
      <thead>
        <tr>
          <th>
            <SelectAll />
          </th>
          <th>Date</th>
          <th>Progress</th>
          <th>Duration</th>
          {hasUsers && <th>User</th>}
          {hasReferrers && <th>Referrer</th>}
          {columns.map((column, i) => (
            <ColumnHeader key={i} content={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {sessions.map(session => (
          <Row
            key={session.id}
            session={session}
            hasUsers={hasUsers}
            hasReferrers={hasReferrers}
            extraCols={columns}
          />
        ))}
      </tbody>
    </StyledTable>
  )
}

export default ResultsTable
