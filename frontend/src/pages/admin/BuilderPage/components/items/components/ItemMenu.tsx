import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import {
  newItemForm,
  newResponseChoiceForm,
  updateNextId,
  addSendEmailAction,
  addCommentAction,
  addCollectEmailAction
} from 'store/slices/script'
import { ScriptActionType, ScriptItem } from 'types/scriptTypes'
import ContextMenu, { ContextDelete, ContextNavigate } from '../../ContextMenu'

type Props = {
  containerRef: React.RefObject<any>
  position: number
  item: ScriptItem
}

const Menu: React.FunctionComponent<Props> = ({ position, item, containerRef }) => {
  const dispatch = useDispatch()

  const addComment = () => dispatch(addCommentAction(position))
  const addCollectEmail = () => dispatch(addCollectEmailAction(position))
  const addEmail = () => dispatch(addSendEmailAction(position))

  const newResponseChoice = () => dispatch(newResponseChoiceForm(position))
  const newItem = (insertPos: number) => dispatch(newItemForm(insertPos))
  const changeNavigation = (nextId: number) =>
    dispatch(updateNextId({ position, nextId }))

  const hasAction = !!item.action
  const hasChooseResponse =
    item.action && item.action.type === ScriptActionType.ChooseResponse

  return (
    <ContextMenu htmlId={position}>
      <ContextNavigate
        disabled={hasChooseResponse}
        position={position}
        targetRef={containerRef}
        onChangeNavigation={changeNavigation}
        currentValue={item.nextId}
      />
      <Dropdown.Divider />
      <Dropdown.Item as="button" disabled={hasAction} onClick={newResponseChoice}>
        Add response
      </Dropdown.Item>
      <Dropdown.Item as="button" disabled={hasAction} onClick={addComment}>
        Collect a comment
      </Dropdown.Item>
      <Dropdown.Item as="button" disabled={hasAction} onClick={addCollectEmail}>
        Collect an email
      </Dropdown.Item>
      <Dropdown.Item as="button" disabled={hasAction} onClick={addEmail}>
        Email a document
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item as="button" onClick={() => newItem(position)}>
        Insert 1 above
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => newItem(position + 1)}>
        Insert 1 below
      </Dropdown.Item>
      <ContextDelete position={position} />
    </ContextMenu>
  )
}

export default Menu
