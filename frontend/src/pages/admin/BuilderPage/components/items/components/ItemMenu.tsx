import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import {
  addAction,
  newItemForm,
  newResponseChoiceForm,
  updateNextId
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
  const addComment = () =>
    dispatch(
      addAction({
        action: { type: ScriptActionType.Comment },
        position
      })
    )

  const addEmail = () =>
    dispatch(
      addAction({
        action: { type: ScriptActionType.SendEmail, content: 'my document' },
        position
      })
    )
  const newResponseChoice = () => dispatch(newResponseChoiceForm(position))
  const newItem = (insertPos: number) => dispatch(newItemForm(insertPos))
  const changeNavigation = (nextId: number) =>
    dispatch(updateNextId({ position, nextId }))

  const hasAction = !!item.action
  const hasChooseResponse =
    item.action && item.action.type === ScriptActionType.ChooseResponse

  return (
    <ContextMenu id={position}>
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
