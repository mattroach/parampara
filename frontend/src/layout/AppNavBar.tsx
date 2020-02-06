import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import logo from './logo_white.png';

type Props = {
  extra: React.ReactNode
}

const AppNavBar: React.FunctionComponent<Props> = ({extra}) => {
  const email = useSelector((state: RootState) => state.adminStore.admin?.email)

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#">
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