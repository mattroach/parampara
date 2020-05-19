import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from 'superadmin/api'
import { SubscriptionTier } from 'types/adminTypes'
import SubscriptionTierSelect from './ProToggle'
import UserActionsButton from './UserActionsButton'

type User = {
  id: string
  created: string
  email: string
  subscriptionTier: SubscriptionTier
}

const ListUsers: React.FunctionComponent = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined)

  useEffect(() => {
    api.getUsers().then(users => {
      setUsers(users)
    })
  }, [])

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
                    <SubscriptionTierSelect
                      userId={user.id}
                      tier={user.subscriptionTier}
                    />
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
