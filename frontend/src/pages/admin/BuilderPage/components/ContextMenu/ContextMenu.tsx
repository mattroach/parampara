import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import styled from 'styled-components'

const StyledDropdownButton = styled(DropdownButton)`
  > button {
    right: -5px;
    top: -10px;
    position: absolute;
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
    border: none;
    font-size: 10px;

    display: inline-block;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  > button[aria-expanded='true'] {
    opacity: 1;
  }
`

type Props = {
  htmlId: number | string
}

const ContextMenu: React.FunctionComponent<Props> = ({ htmlId, children }) => (
  <StyledDropdownButton
    id={'edit-item-' + htmlId}
    variant="secondary"
    className="item-menu"
    title="Actions"
  >
    {children}
  </StyledDropdownButton>
)

export default ContextMenu
