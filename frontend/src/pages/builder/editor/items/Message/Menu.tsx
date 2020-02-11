import React from 'react'
import ItemMenu from '../components/ItemMenu'
import ItemMenuDelete from '../components/ItemMenuDelete'
import Dropdown from 'react-bootstrap/Dropdown'
import { ScriptItem, ScriptActionType } from 'types/scriptTypes'
import { useDispatch } from 'react-redux'
import { addAction, addNewResponseChoice } from 'store/slices/script'

type Props = {
  position: number
  item: ScriptItem
}

const Menu: React.FunctionComponent<Props> = ({ position, item }) => {
  const dispatch = useDispatch()
  const deleteItem = () => dispatch(addAction({ type: ScriptActionType.Comment }, position))
  const newResponseChoice = () => dispatch(addNewResponseChoice(position))

  return (
    <ItemMenu id={position}>
      <Dropdown.Item as="button" disabled={!!item.action} onClick={newResponseChoice}>Add response choice</Dropdown.Item>
      <Dropdown.Item as="button" disabled={!!item.action} onClick={deleteItem}>Collect a comment</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item as="button">Add navigation jump</Dropdown.Item>
      <Dropdown.Divider />
      <ItemMenuDelete position={position} />
    </ItemMenu>
  )
}

export default Menu