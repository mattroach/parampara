import React, { useState } from 'react'
import Menu from './Menu'
import { NavId } from '../../items/styles'
import { ResponseChoice } from 'types/scriptTypes'
import styled from 'styled-components'
import ResponseOption from '../components/Response/ResponseOption'
import { useDispatch } from 'react-redux'
import { updateResponseOption, removeResponseChoice } from 'store/slices/script'

const StyledNavId = styled(NavId)`
  margin-left: 8px;
`

const StyledResponseOption = styled(ResponseOption)`
  :hover button {
    opacity: 1;
  }
`

type Props = {
  position: number
  responsePosition: number
  response: ResponseChoice
}

const SavedResponseOption: React.FunctionComponent<Props> = ({
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
      renderNavId={() =>
        response.nextId !== undefined && <StyledNavId>{response.nextId}</StyledNavId>
      }
      renderMenu={wrapperRef => (
        <Menu
          response={response}
          position={position}
          responsePosition={responsePosition}
          containerRef={wrapperRef}
        />
      )}
    />
  )
}

export default SavedResponseOption
