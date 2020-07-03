import React from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MenuButton from './MenuButton'

const StyledTable = styled(Table)`
  td {
    vertical-align: middle;
  }
  tr th:nth-last-child(1) {
    text-align: right;
  }
`

const NoPaddingTh = styled.th`
  vertical-align: middle !important;
  padding: 0 0.75rem !important;
`

const ScriptsTable: React.FunctionComponent = () => {
  const scripts = useSelector(state => state.scriptsStore.scripts!)

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
              <Link to={`/script/${script.id}`}>
                {script.title ? script.title : 'Unnamed script'}
              </Link>
            </td>
            <td>
              <FormattedDate datetime={script.created} />
            </td>
            <NoPaddingTh>
              <MenuButton script={script} />
            </NoPaddingTh>
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
