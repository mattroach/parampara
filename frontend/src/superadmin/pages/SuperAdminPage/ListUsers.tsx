import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import AuthContext from 'superadmin/AuthContext'
import UserActionsButton from './UserActionsButton'
import styled from 'styled-components'
import ProToggle from './ProToggle'
import { SubscriptionTier } from 'types/adminTypes'
import dayjs from 'dayjs'

type User = {
  id: string
  created: string
  email: string
  subscriptionTier: SubscriptionTier
}

const ListUsers: React.FunctionComponent = () => {
  const password = useContext(AuthContext)
  const [users, setUsers] = useState<User[] | undefined>(undefined)

  useEffect(() => {
    axios.get(`/api/superadmin/getUsers`, { params: { password } }).then(response => {
      setUsers(response.data)
    })
  }, [password])

  return (
    <>
      <h4>Parampara users</h4>
      <StyledTable hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Created on</th>
            <th>Subscription</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/u/${user.id}`}>{user.email}</Link>
                  </td>
                  <td>{dayjs(user.created).format('DD MMM YYYY, h:mma')}</td>
                  <td className="subscription">
                    <ProToggle userId={user.id} isPro={user.subscriptionTier === 'pro'} />
                  </td>
                  <td className="actions">
                    <UserActionsButton userId={user.id} />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </StyledTable>
    </>
  )
}

const StyledTable = styled(Table)`
  td.actions,
  td.subscription {
    padding-top: 0;
    padding-bottom: 0;
    vertical-align: middle;
  }
  td.actions {
    text-align: right;
  }
  td.subscription {
    line-height: 1.4em;
  }
`

export default ListUsers
