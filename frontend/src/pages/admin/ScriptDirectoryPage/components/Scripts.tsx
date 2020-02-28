import React, { useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { RootState } from 'store/rootReducer'
import { loadScripts } from 'store/slices/scripts'
import { useSelector, useDispatch } from 'react-redux'
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

const Scripts: React.FunctionComponent<Props> = ({ adminId }) => {
  const scripts = useSelector((state: RootState) => state.scriptsStore.scripts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadScripts(adminId))
  }, [dispatch, adminId])

  if (!scripts) return <Spinner animation="border" />

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

export default Scripts

const FormattedDate: React.FunctionComponent<{ datetime: string }> = ({ datetime }) => {
  const date = new Date(datetime)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return <>{date.toLocaleDateString('en-US', options)}</>
}
