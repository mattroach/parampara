import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector } from 'react-redux'

import { RootState } from 'store/rootReducer'
import logo from './logo_white.png'
import { useHistory } from 'react-router-dom'

type Props = {
  extra: React.ReactNode
  adminId: string
}

const AppNavBar: React.FunctionComponent<Props> = ({ extra, adminId }) => {
  const email = useSelector((state: RootState) => state.adminStore.admin?.email)
  const history = useHistory()

  const goBackToDirectory = (event: any) => {
    event.preventDefault()
    history.push(`/u/${adminId}`)
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#" onClick={goBackToDirectory}>
        <img alt="Parampara" src={logo} width={200} />
      </Navbar.Brand>
      {extra}
      <div className="ml-auto">
        <Navbar.Text>
          Signed in as: <strong>{email}</strong>
        </Navbar.Text>
      </div>
    </Navbar>
  )
}

export default AppNavBar
