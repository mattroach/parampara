import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store/rootReducer';
import { loadAdmin } from '../store/slices/admin';
import AppNavBar from './AppNavBar';
import Loader from './Loader';

export const Wrapper = styled.section`
  margin: 20px;
  max-width: 1000px;
`

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
        <Wrapper>
          {this.props.children}
        </Wrapper>
      </>
    )
  }
}

function mapStateToProps(state: RootState) {
  return { admin: state.adminStore.admin }
}

// @ts-ignore
export default connect(mapStateToProps, { loadAdmin })(AdminLayout)