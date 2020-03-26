import React, { RefObject, ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import styled from 'styled-components'
import { ScriptItem, ScriptItemType } from 'types/scriptTypes'

const StyledControlWrap = styled.span`
  > select {
    display: inline-block;
    width: 45px;
    margin-left: 8px;
  }
`

type Props = {
  focusRef: RefObject<any>
  position: number
  currentValue: number | undefined
  onSelect: (nextId: number) => void
}

const NavigationForm: React.FunctionComponent<Props> = ({
  focusRef,
  position,
  currentValue,
  onSelect
}) => {
  const items = useSelector((state: RootState) => state.scriptStore.script!.version.items)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) =>
    onSelect(parseInt(event.target.value))

  const defaultValue = currentValue ? currentValue : position + 1
  return (
    <>
      Navigate to
      <StyledControlWrap>
        <Form.Control
          ref={focusRef}
          as="select"
          value={defaultValue.toString()}
          onChange={onChange}
        >
          {items.map((item, i) => (
            <Option key={item.id} item={item} pos={i} />
          ))}
        </Form.Control>
      </StyledControlWrap>
    </>
  )
}

type OptionProps = {
  item: ScriptItem
  pos: number
}
const Option: React.FunctionComponent<OptionProps> = ({ item, pos }) => {
  let txt = item.type === ScriptItemType.Message ? item.message.substring(0, 40) : 'Giphy'
  if (txt.length === 40) txt += '...'

  let posTxt = pos.toString()
  posTxt += '\u00A0'.repeat((2 - posTxt.length) * 2 + 1)

  return (
    <option value={pos}>
      {posTxt} {txt}
    </option>
  )
}

export default NavigationForm
