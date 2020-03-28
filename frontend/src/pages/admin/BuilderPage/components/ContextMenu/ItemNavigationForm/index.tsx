import React, { useState } from 'react'
import Select, { components } from 'react-select'
import styled from 'styled-components'
import { ScriptItem, ScriptItemType } from 'types/scriptTypes'
import { NavId } from '../../items/styles'

type Props = {
  items: ScriptItem[]
  thisItemPosition: number
  currentValue?: number
}

const createLabel = (msg: string) => {
  let txt = msg.substring(0, 80)
  if (txt.length === 50) txt += '...'
  return txt
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    width: 480
  }),
  option: (provided: any) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }),
  control: (provided: any) => ({
    ...provided,
    width: 300
  })
}

const ItemNavigationForm: React.FunctionComponent<Props> = ({
  items,
  thisItemPosition,
  currentValue
}) => {
  const [value, setValue] = useState(currentValue || thisItemPosition + 1)

  const options = items.map((item, pos) => {
    const label = createLabel(item.type === ScriptItemType.Image ? 'Giphy' : item.message)
    return {
      value: pos,
      label: pos + label,
      message: label,
      isDisabled: pos === thisItemPosition,
      default: pos === thisItemPosition + 1
    }
  })

  return (
    <Select
      styles={customStyles}
      defaultValue={options[value]}
      components={{ Option, SingleValue }}
      isClearable={true}
      isSearchable={true}
      options={options}
      onChange={() => console.log('onChange')}
    />
  )
}

const SingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <StyledNavId>{props.data.value}</StyledNavId>
    {props.data.message}
  </components.SingleValue>
)

const Option = (props: any) => (
  <components.Option {...props}>
    {props.data.isDisabled ? <Annotate>current</Annotate> : undefined}
    {props.data.default ? <Annotate>default</Annotate> : undefined}
    <StyledNavId>{props.data.value}</StyledNavId>
    {props.data.message}
  </components.Option>
)

const StyledNavId = styled(NavId)`
  margin-right: 8px;
`

const Annotate = styled.span`
  float: right;

  background: #ebebeb;
  border-radius: 22px;
  padding: 0 6px;

  font-style: italic;
  color: #666;
  font-size: 0.8rem;
`

export default ItemNavigationForm
