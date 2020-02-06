import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { loadAdmin } from 'store/slices/admin'
import AppNavBar from './AppNavBar'
import Loader from '../components/Loader'


type Props = {
  adminId: string
  navbarExtra?: React.ReactNode
  loadAdmin: typeof loadAdmin
} & ReturnType<typeof mapStateToProps>

class AdminLayout extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.loadAdmin(this.props.adminId)
  }

  render() {
    if (!this.props.admin)
      return <Loader />

    return (
      <>
        <AppNavBar extra={this.props.navbarExtra} />
        {this.props.children}
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  return { admin: state.adminStore.admin }
}

// @ts-ignore
export default connect(mapStateToProps, { loadAdmin })(AdminLayout)