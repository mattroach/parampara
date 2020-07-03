import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeResponseChoice, updateResponseOption } from 'store/slices/script'
import styled from 'styled-components'
import { MultiSelect } from 'types/scriptTypes'
import ResponseOption from '../components/Response/ResponseOption'
import Checkbox from './Checkbox'
import Menu from './Menu'

const StyledResponseOption = styled(ResponseOption)`
  :hover button {
    opacity: 1;
  }
`

type Props = {
  position: number
  responsePosition: number
  response: MultiSelect
}

const SavedMultiSelectOption: React.FunctionComponent<Props> = ({
  position,
  responsePosition,
  response
}) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>(response.message)

  const submit = (newMsg: string) => {
    dispatch(updateResponseOption({ position, responsePosition, newMsg }))
  }
  const clear = () => {
    dispatch(removeResponseChoice({ position, responsePosition }))
  }

  return (
    <StyledResponseOption
      value={value}
      setValue={setValue}
      onSubmit={submit}
      onClear={clear}
      renderBefore={() => <Checkbox />}
      renderMenu={() => <Menu position={position} responsePosition={responsePosition} />}
    />
  )
}

export default SavedMultiSelectOption
