import React from 'react'
import ItemMenu from '../components/ItemMenu'
import ItemMenuDelete from '../components/ItemMenuDelete'
import Dropdown from 'react-bootstrap/Dropdown'
import { ScriptItem, ScriptActionType } from 'types/scriptTypes'
import { useDispatch } from 'react-redux'
import { addAction, newResponseChoiceForm, newItemForm } from 'store/slices/script'
import ItemMenuNavigation from '../components/ItemMenuNavigation'

type Props = {
  containerRef: React.RefObject<any>
  position: number
  item: ScriptItem
}

const Menu: React.FunctionComponent<Props> = ({ position, item, containerRef }) => {
  const dispatch = useDispatch()
  const deleteItem = () => dispatch(addAction({ type: ScriptActionType.Comment }, position))
  const newResponseChoice = () => dispatch(newResponseChoiceForm(position))
  const newItem = (insertPos: number) => dispatch(newItemForm(insertPos))

  const hasAction = !!item.action

  return (
    <ItemMenu id={position}>
      <Dropdown.Item as="button" disabled={hasAction} onClick={newResponseChoice}>Add response option</Dropdown.Item>
      <Dropdown.Item as="button" disabled={hasAction} onClick={deleteItem}>Collect a comment</Dropdown.Item>
      <Dropdown.Divider />
      <ItemMenuNavigation disabled={hasAction} position={position} targetRef={containerRef} />
      <Dropdown.Divider />
      <Dropdown.Item as="button" onClick={() => newItem(position)}>Insert 1 above</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => newItem(position + 1)}>Insert 1 below</Dropdown.Item>
      <ItemMenuDelete position={position} />
    </ItemMenu>
  )
}

export default Menu