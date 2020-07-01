import React from 'react'
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'
import { ListedScript } from '../../../../types/scriptTypes'
import MaterialIcon from 'material-icons-react'
import DeleteButton from './DeleteButton'
import CopyButton from './CopyButton'

type Props = {
  script: ListedScript
}

const StyledDropdownButton = styled(Dropdown.Toggle)`
  padding: 4px 6px;
  ::after {
    display: none;
  }

  i {
    display: block;
  }
`

const MenuButton: React.FunctionComponent<Props> = ({ script }) => (
  <Dropdown>
    <StyledDropdownButton id="menu" variant="light">
      <MaterialIcon icon="more_horiz" />
    </StyledDropdownButton>
    <Dropdown.Menu>
      <CopyButton script={script} />
      <DeleteButton script={script} />
    </Dropdown.Menu>
  </Dropdown>
)

export default MenuButton
