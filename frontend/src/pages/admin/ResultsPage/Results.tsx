import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loadScriptResults } from 'store/slices/scriptResults'
import { RootState } from 'store/rootReducer'
import Table from 'react-bootstrap/Table'
import { SessionResponse } from 'api/types'
import ProgressBar from 'react-bootstrap/ProgressBar'

type Props = {
  scriptId: string
}

const StyledTable = styled(Table)`
  tbody td {
    vertical-align: middle;
  }
`
const Results: React.FunctionComponent<Props> = ({ scriptId }) => {
  const scriptResults = useSelector((state: RootState) => state.scriptResultsStore.data)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadScriptResults(scriptId))
  }, [])


  return (
    <StyledTable responsive size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Progress</th>
          <th>Referrer</th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>
        {scriptResults?.map(result => {
          return (
            <tr key={result.id}>
              <td>{dayjs(result.created).format('DD MMM YYYY, h:mma')}</td>
              <td>{result.sessionUserId}</td>
              <td><ProgressBar now={result.progress} label={`${result.progress}%`} /></td>
              <td>{result.referrerCode}</td>
              <td>{result.responses.map(response => <Response data={response} />)}</td>
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export default Results


const ResponseWrapper = styled.span`
  background: #e9ecef;
  border-radius: 6px;
  margin-right: 4px;
  padding: 2px 6px;
`

const Response: React.FunctionComponent<{ data: SessionResponse }> = ({ data }) => {
  return (
    <ResponseWrapper><i>{data.message}</i>: <strong>{data.response}</strong>  </ResponseWrapper>
  )
}