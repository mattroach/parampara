import { compose } from '@reduxjs/toolkit'
import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import { RootState } from '../../store/rootReducer'
import { loadScript } from '../../store/slices/script'
import AdminLayout from '../AdminLayout'
import Header from './components/Header'

const Wrapper = styled.section`
  margin: 20px;
  max-width: 1000px;
`

type Props = {
  adminId: string
  scriptId: string
  loadScript: typeof loadScript
} & RouteComponentProps & ReturnType<typeof mapStateToProps>

class BuilderPage extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.loadScript(this.props.scriptId)
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
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={this.goBackToDirectory}>Back to directory</Nav.Link>
          </Nav>
        }>
        {scriptLoaded ? <Header /> : <Loader />}
        {scriptLoaded && <Wrapper>{children}</Wrapper>}
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
)(BuilderPage) as any
