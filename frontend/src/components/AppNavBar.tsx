import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'

import logo from './logo.svg'
import { RootState } from '../store/rootReducer'


const AppNavBar: React.FunctionComponent<{}> = () => {
  const email = useSelector((state: RootState) => state.adminStore.admin?.email)

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">
        <img alt="Parampara" src={logo} />
      </Navbar.Brand>
      <div className="ml-auto">
        <Navbar.Text>
          Signed in as: <strong>{email}</strong>
        </Navbar.Text>
      </div>
    </Navbar>
  )
}

export default AppNavBar