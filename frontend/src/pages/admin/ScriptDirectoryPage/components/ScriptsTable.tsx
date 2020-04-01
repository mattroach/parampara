import React from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'
import DeleteButton from './DeleteButton'

const StyledTable = styled(Table)`
  td {
    vertical-align: middle;
  }
  tr th:nth-last-child(1) {
    text-align: right;
  }
`

type Props = {
  adminId: string
}

const ScriptsTable: React.FunctionComponent<Props> = ({ adminId }) => {
  const scripts = useSelector((state: RootState) => state.scriptsStore.scripts!)

  return (
    <StyledTable responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created on</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {scripts.map(script => (
          <tr key={script.id}>
            <td>
              <Link to={`/builder/${adminId}/${script.id}/create`}>
                {script.title ? script.title : 'Unnamed script'}
              </Link>
            </td>
            <td>
              <FormattedDate datetime={script.created} />
            </td>
            <th>
              <DeleteButton script={script} />
            </th>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default ScriptsTable

const FormattedDate: React.FunctionComponent<{ datetime: string }> = ({ datetime }) => {
  const date = new Date(datetime)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return <>{date.toLocaleDateString('en-US', options)}</>
}
