import MaterialIcon from 'material-icons-react'
import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useDispatch } from 'react-redux'
import {
  addCollectEmailAction,
  addCommentAction,
  addSendEmailAction
} from 'store/slices/script'
import styled from 'styled-components'

const IconDropdownButton = styled(DropdownButton)`
  display: inline;
  > button {
    width: 40px;
    height: 40px;
    opacity: 0.9;
    vertical-align: top;
    padding: 0;

    transition: box-shadow 0.15s ease-in-out;
    :focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  i {
    vertical-align: middle;
  }
  .dropdown-toggle::after {
    display: none;
  }
`
type Props = { onAddItem?: () => void }

const AddAction: React.FunctionComponent<Props> = ({ onAddItem }) => {
  const dispatch = useDispatch()

  const addWidget = (action: () => any) => () => {
    dispatch(action())
    onAddItem && onAddItem()
  }

  return (
    <IconDropdownButton
      id="widgets"
      variant="link"
      title={<MaterialIcon icon="more_horiz" size={30} color="#0076ff" />}
    >
      <Dropdown.Item as="button" onClick={addWidget(addCommentAction)}>
        Collect a comment
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={addWidget(addCollectEmailAction)}>
        Collect an email
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={addWidget(addSendEmailAction)}>
        Email a document
      </Dropdown.Item>
    </IconDropdownButton>
  )
}

export default AddAction
