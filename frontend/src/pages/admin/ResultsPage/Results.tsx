import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loadScriptResults } from 'store/slices/scriptResults'
import { RootState } from 'store/rootReducer'
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Badge from 'react-bootstrap/Badge'
import Loader from 'components/Loader'
import transposeResults from './transposeResults'

type Props = {
  scriptId: string
}

const StyledTable = styled(Table)`
  margin-top: 20px;
  font-size: 0.85rem;

  tbody td {
    vertical-align: middle;

    :first-of-type {
      white-space: nowrap;
    }
  }

  td.response {
    width: 45%;
  }
`
const Results: React.FunctionComponent<Props> = ({ scriptId }) => {
  const hasUsers = useSelector((state: RootState) => !state.scriptStore.script!.allowAnon)
  const scriptResults = useSelector((state: RootState) => state.scriptResultsStore.data)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadScriptResults(scriptId))
  }, [dispatch, scriptId])

  if (!scriptResults)
    return <Loader />

  const transposedResults = transposeResults(scriptResults)

  return (
    <StyledTable responsive hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Progress</th>
          {hasUsers && <th>User</th>}
          <th>Referrer</th>
          {transposedResults.columns.map((column, i) => <Column key={i} content={column} />)}
        </tr>
      </thead>
      <tbody>
        {transposedResults.sessions.map(result => {
          return (
            <tr key={result.id}>
              <td>{dayjs(result.created).format('DD MMM YYYY, h:mma')}</td>
              <td><ProgressBar now={result.progress} label={`${result.progress}%`} /></td>
              {hasUsers && <td>{result.sessionUser?.email}</td>}
              <td><Badge variant="secondary">{result.referrerCode}</Badge></td>
              {transposedResults.columns.map((column, i) => {
                const response = result.responseByMessage[column]
                return <td key={i} className="response">{response?.response}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export default Results


const Column: React.FunctionComponent<{ content: string }> = ({ content }) => {
  return <th className="response">{content}</th>
}
