import React from 'react'
import Select, { components } from 'react-select'
import styled from 'styled-components'
import { ScriptItem, ScriptItemType } from 'types/scriptTypes'
import { NavId } from '../../items/styles'

type Props = {
  items: ScriptItem[]
  position: number
  currentValue?: number
  onSelect: (nextId: number) => void
  onBlur?: () => void
}

const createLabel = (msg: string) => {
  let txt = msg.substring(0, 80)
  if (txt.length === 50) txt += '...'
  return txt
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    width: 250
  }),
  option: (provided: any) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }),
  control: (provided: any) => ({
    ...provided,
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    width: 250
  })
}

type Option = {
  value: number
  label: string
  message: string
  isDisabled: boolean
  default: boolean
}

const ItemNavigationForm: React.FunctionComponent<Props> = ({
  items,
  position,
  currentValue,
  onSelect,
  onBlur
}) => {
  const defaultValue = currentValue || position + 1

  const options: Option[] = items.map((item, pos) => {
    const label = createLabel(item.type === ScriptItemType.Image ? 'Giphy' : item.message)
    return {
      value: pos,
      label: pos + label,
      message: label,
      isDisabled: pos === position,
      default: pos === position + 1
    }
  })

  return (
    <Select
      openMenuOnFocus={true}
      autoFocus
      styles={customStyles}
      defaultValue={options[defaultValue]}
      components={{ Option, SingleValue }}
      isClearable={false}
      isSearchable={true}
      options={options}
      onChange={option => onSelect((option as Option).value)}
      onBlur={onBlur}
    />
  )
}

const SingleValueCont = styled.span`
  color: #888;
`
const SingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <SingleValueCont>{props.data.message}</SingleValueCont>
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
  margin-top: 3px;

  background: #ebebeb;
  border-radius: 22px;
  padding: 0 6px;

  font-style: italic;
  color: #666;
  font-size: 0.8rem;
`

export default ItemNavigationForm
