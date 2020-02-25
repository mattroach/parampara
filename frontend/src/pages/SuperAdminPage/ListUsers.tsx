import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

type Props = {
  password: string
}

type User = {
  id: string
  email: string
}

const ListUsers: React.FunctionComponent<Props> = ({ password }) => {
  const [users, setUsers] = useState<User[] | undefined>(undefined)

  useEffect(() => {
    axios.get(`/api/superadmin/getUsers`, { params: { password } })
      .then(response => {
        setUsers(response.data)
      })
  }, [password])

  return (
    <>
      <h4>Current users</h4>
      <ul>
        {users && users.map(user => {
          return <li>
            <Link to={`/u/${user.id}`}>{user.email}</Link>
          </li>
        })}
      </ul>
    </>
  )
}

export default ListUsers