import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loadScriptResponses } from 'store/slices/scriptResults'
import { RootState } from 'store/rootReducer'
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Badge from 'react-bootstrap/Badge'
import Loader from 'components/Loader'
import transposeResults from './transposeResults'
import ColumnHeader from './ColumnHeader'
import DurationFormatted from './DurationFormatted'
import EmptyState from './EmptyState'
import { AxiosError } from 'axios'
import AuthenticateResults from './AuthenticateResults'
import { AppDispatch } from 'store/store'

type Props = {
  scriptId: string
}
const StyledTable = styled(({ extraCols: number, ...rest }) => <Table {...rest} />)`
  margin: 20px 0 0 0;
  font-size: 0.85rem;
  line-height: normal;
  min-width: ${props => 300 + props.extraCols * 150}px;

  th,
  td {
    padding: 0.45rem;
  }

  thead th {
    /*
    // Here is another way to keep the headers to one line. The downside is that
    // it makes all columns 200px, even ones that don't need that much
    max-width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; */

    vertical-align: top;
  }
  tbody td {
    :first-of-type {
      white-space: nowrap;
    }
  }
`

const Results: React.FunctionComponent<Props> = ({ scriptId }) => {
  const hasUsers = useSelector((state: RootState) => !state.scriptStore.script!.allowAnon)
  const scriptResults = useSelector((state: RootState) => state.scriptResultsStore.data)

  const [needsAuth, setNeedsAuth] = useState(false)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(loadScriptResponses(scriptId)).catch((e: AxiosError) => {
      if (e.isAxiosError && e.response?.status === 401) setNeedsAuth(true)
    })
  }, [dispatch, scriptId])

  if (!scriptResults) {
    if (needsAuth) return <AuthenticateResults scriptId={scriptId} />

    return <Loader />
  }

  if (scriptResults.length === 0) return <EmptyState />

  const hasReferrers = !!scriptResults.find(e => e.referrerCode)
  const transposedResults = transposeResults(scriptResults)

  return (
    <StyledTable responsive hover bordered extraCols={transposedResults.columns.length}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Progress</th>
          <th>Duration</th>
          {hasUsers && <th>User</th>}
          {hasReferrers && <th>Referrer</th>}
          {transposedResults.columns.map((column, i) => (
            <ColumnHeader key={i} content={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {transposedResults.sessions.map(result => {
          return (
            <tr key={result.id}>
              <td>{dayjs(result.created).format('DD MMM YYYY, h:mma')}</td>
              <td>
                <ProgressBar now={result.progress} label={`${result.progress}%`} />
              </td>
              <td>
                <DurationFormatted durationSec={result.durationSec} />
              </td>
              {hasUsers && <td>{result.sessionUser?.email}</td>}
              {hasReferrers && (
                <td>
                  <Badge variant="secondary">{result.referrerCode}</Badge>
                </td>
              )}
              {transposedResults.columns.map((column, i) => {
                const response = result.responseByMessage[column]
                return <td key={i}>{response?.response}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export default Results
