import React from 'react'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { RootState } from 'store/rootReducer'
import { getSubscription } from 'store/slices/admin'
import Badge from 'react-bootstrap/Badge'
import RootContainer from 'layout/RootContainer'

const Wrapper = styled.section`
  background: #fafafa;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
`

const StyledNav = styled(Nav)`
  .active {
    color: var(--dark) !important;
    font-weight: bold;
    border-bottom: 2px solid var(--dark) !important;
    padding-bottom: 10px;

    .badge {
      background-color: var(--dark);
    }
  }
`

const StyledNavItem = styled(Nav.Item)``

const StyledNavLink = styled(Nav.Link)`
  padding: 12px 0;
  margin-right: 40px;
  margin-bottom: -1px;
  text-transform: uppercase;

  color: var(--gray);

  :hover {
    color: var(--gray);
    border-bottom: 2px solid var(--gray);
    padding-bottom: 10px;
  }
`

const ResultsNav: React.FunctionComponent = () => {
  const subscription = useSelector((state: RootState) =>
    getSubscription(state.adminStore)
  )

  const { adminId, scriptId } = useSelector((state: RootState) => ({
    adminId: state.adminStore.admin!.id,
    scriptId: state.scriptStore.script!.id
  }))

  const to = (path: string) => `/builder/${adminId}/${scriptId}/results/${path}`

  return (
    <Wrapper>
      <RootContainer>
        <StyledNav>
          <StyledNavItem>
            <LinkContainer to={to('')} exact>
              <StyledNavLink>Responses</StyledNavLink>
            </LinkContainer>
          </StyledNavItem>
          <StyledNavItem>
            <LinkContainer to={to('insights')}>
              <StyledNavLink>
                Insights{subscription.canViewInsights() || <ProOnly>pro</ProOnly>}
              </StyledNavLink>
            </LinkContainer>
          </StyledNavItem>
        </StyledNav>
      </RootContainer>
    </Wrapper>
  )
}

export default ResultsNav

const ProOnly = styled(Badge).attrs({
  pill: true,
  variant: 'secondary'
})`
  transition: none;
  margin-left: 8px;
  vertical-align: middle;
  padding: 0.25rem 0.5rem;
  background-color: #818a91;
`
