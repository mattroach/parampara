import React from 'react'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { RootState } from 'store/rootReducer'

const StyledNav = styled(Nav)`
  padding: 0 20px;
  background: #fafafa;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;

  .active {
    color: #212529 !important;
    font-weight: bold;
    border-bottom: 2px solid #212529 !important;
    padding-bottom: 10px;
  }
`

const StyledNavItem = styled(Nav.Item)``

const StyledNavLink = styled(Nav.Link)`
  padding: 12px 0;
  margin-right: 40px;
  margin-bottom: -1px;
  text-transform: uppercase;

  color: #818a91;

  :hover {
    color: #818a91;
    border-bottom: 2px solid #818a91;
    padding-bottom: 10px;
  }
`

const ResultsNav: React.FunctionComponent = () => {
  const { adminId, scriptId } = useSelector((state: RootState) => ({
    adminId: state.adminStore.admin!.id,
    scriptId: state.scriptStore.script!.id
  }))

  const to = (path: string) => `/builder/${adminId}/${scriptId}/results/${path}`

  return (
    <StyledNav>
      <StyledNavItem>
        <LinkContainer to={to('')} exact>
          <StyledNavLink>Responses</StyledNavLink>
        </LinkContainer>
      </StyledNavItem>
      <StyledNavItem>
        <LinkContainer to={to('insights')}>
          <StyledNavLink>Insights</StyledNavLink>
        </LinkContainer>
      </StyledNavItem>
    </StyledNav>
  )
}

export default ResultsNav
