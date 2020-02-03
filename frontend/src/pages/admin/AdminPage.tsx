import React from 'react'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'

import * as styles from './AdminPage.styles'

import {loadAdmin} from '../../store/slices/admin'
import { RootState } from '../../store/rootReducer'
import AppNavBar from '../../components/AppNavBar'
import Scripts from './components/Scripts'
import Loader from '../../components/Loader'

type State = {

}

type Props = {
  adminId: string
  loadAdmin: typeof loadAdmin
} & ReturnType<typeof mapStateToProps>

class AdminPage extends React.Component<Props, State> {

  componentDidMount() {
    this.props.loadAdmin(this.props.adminId)
  }

  render() {
    if (!this.props.admin)
      return <Loader />

    return (
      <styles.Wrapper>
        <AppNavBar />
        <styles.Header>Your Paramparas</styles.Header>
        <styles.AddNewButton>
          <Button variant="secondary">Create a new Parampara</Button>
        </styles.AddNewButton>
        <Scripts adminId={this.props.adminId} />
      </styles.Wrapper>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {admin: state.adminStore.admin}
}

// @ts-ignore
export default connect(mapStateToProps, {loadAdmin})(AdminPage)