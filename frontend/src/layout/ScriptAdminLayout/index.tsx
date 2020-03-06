import { compose } from '@reduxjs/toolkit'
import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Loader from '../../components/Loader'
import { RootState } from 'store/rootReducer'
import { loadScript } from 'store/slices/script'
import AdminLayout from '../AdminLayout'
import Header from './components/Header'
import { ScriptVersionType } from 'api/types'

type Props = {
  adminId: string
  scriptId: string
  loadScript: typeof loadScript
} & RouteComponentProps &
  ReturnType<typeof mapStateToProps>

class ScriptAdminLayout extends React.Component<Props> {
  componentDidMount() {
    this.props.loadScript(this.props.scriptId, ScriptVersionType.draft)
  }

  goBackToDirectory = (event: any) => {
    event.preventDefault()
    this.props.history.push(`/u/${this.props.adminId}`)
  }

  render() {
    const { adminId, scriptLoaded, children } = this.props
    return (
      <AdminLayout
        adminId={adminId}
        navbarExtra={
          <Nav.Link href="#" onClick={this.goBackToDirectory}>
            Main menu
          </Nav.Link>
        }
      >
        {scriptLoaded ? <Header /> : <Loader />}
        {scriptLoaded && children}
      </AdminLayout>
    )
  }
}

function mapStateToProps(state: RootState) {
  return { scriptLoaded: !!state.scriptStore.script }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { loadScript })
)(ScriptAdminLayout) as any
