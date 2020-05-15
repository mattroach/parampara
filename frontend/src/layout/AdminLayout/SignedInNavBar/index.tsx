import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSubscription } from 'store/slices/admin'
import styled from 'styled-components'
import AppNavBar from '../AppNavBar'
import ProfileDropdown from './ProfileDropdown'

const ProBadge = styled(Badge).attrs({ variant: 'light', pill: true })`
  opacity: 0.75;
`

type Props = {
  extra: React.ReactNode
}

const SignedInAppNavBar: React.FunctionComponent<Props> = ({ extra }) => {
  const subscription = useSelector(state => getSubscription(state.adminStore))
  const history = useHistory()

  return (
    <AppNavBar onLogoClick={() => history.push('/account')}>
      <Nav className="mr-auto">{extra}</Nav>
      <Nav activeKey={false}>
        <ProfileDropdown />
      </Nav>
      {subscription.hasProBadge() && (
        <Nav>
          <ProBadge>Pro</ProBadge>
        </Nav>
      )}
    </AppNavBar>
  )
}

export default SignedInAppNavBar
