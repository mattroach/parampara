import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import styled from 'styled-components'

const StyledDropdownButton = styled(DropdownButton)`
  > button {
    right: -14px;
    top: -22px;
    position: absolute;
    height: 23px;
    line-height: 25px;
    padding: 0 6px;
    border: none;
    display: none;
    font-size: 12px;
  }

  > button[aria-expanded="true"] {
    display: inline;
  }
`

type Props = {
  id: number
}

const ItemMenu: React.FunctionComponent<Props> = ({ id, children }) => (
  <>
    <StyledDropdownButton
      id={'edit-item-' + id}
      variant="secondary"
      className="item-menu"
      title="Edit"
      onClick={(event: any) => event.stopPropagation()}
    >
      {children}
    </StyledDropdownButton>
  </>
)

export default ItemMenu