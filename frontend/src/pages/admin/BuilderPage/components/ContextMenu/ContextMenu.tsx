import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import styled from 'styled-components'

const StyledDropdownButton = styled(DropdownButton)`
  > button {
    right: -7px;
    top: -12px;
    position: absolute;
    height: 23px;
    line-height: 25px;
    padding: 0 6px;
    border: none;
    font-size: 12px;

    display: inline-block;
    opacity: 0;
  }

  > button[aria-expanded='true'] {
    opacity: 1;
  }
`

type Props = {
  id: number
}

const ContextMenu: React.FunctionComponent<Props> = ({ id, children }) => (
  <>
    <StyledDropdownButton
      id={'edit-item-' + id}
      variant="secondary"
      className="item-menu"
      title="Action"
      onClick={(event: any) => event.stopPropagation()}
    >
      {children}
    </StyledDropdownButton>
  </>
)

export default ContextMenu
