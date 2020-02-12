import React from 'react'
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
  position: number
  onSelect: (nextId: number) => void
}

const NavigationForm: React.FunctionComponent<Props> = ({ position, onSelect }) => {
  const { nextItems, nextId } = useSelector((state: RootState) => {
    const { script } = state.scriptStore
    if (!script) throw Error('no script')

    return {
      nextItems: script.version.items.slice(position + 1),
      nextId: script.version.items[position].nextId
    }
  })

  const onChange = (event: any) => onSelect(parseInt(event.target.value))

  const defaultValue = nextId ? nextId : position + 1
  return (
    <>
      Navigate to
      <StyledControlWrap>
        <Form.Control
          as="select"
          value={defaultValue.toString()}
          onChange={onChange}
          autoFocus>
          {nextItems.map((item, i) => {
            const pos = i + position + 1
            return <Option key={i} item={item} pos={pos} />
          })}
        </Form.Control>
      </StyledControlWrap>
    </>
  )
}

const Option: React.FunctionComponent<{ item: ScriptItem, pos: number }> = ({ item, pos }) => {
  let txt = item.type === ScriptItemType.Message ? item.message.substring(0, 40) : 'Giphy'
  if (txt.length === 40)
    txt += '...'

  let posTxt = pos.toString()
  posTxt += '\u00A0'.repeat((2 - posTxt.length) * 2 + 1)

  return (
    <option value={pos}>{posTxt} {txt}</option>
  )
}

export default NavigationForm
