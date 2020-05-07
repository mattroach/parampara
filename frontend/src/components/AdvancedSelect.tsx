import React, { ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'

type Props = {
  placeholder: string
  unsetOption: string
  value?: string
  onUnset: () => void
  onSet: (value: string) => void
}

const UNSET_VAL = '_____unset_____'

/**
 * Similar to Form.Control but adds basic placeholder and unset feature
 */
const AdvancedSelect: React.FunctionComponent<Props> = ({
  placeholder,
  unsetOption,
  value,
  onUnset,
  onSet,
  children
}) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (value === UNSET_VAL) {
      onUnset()
    } else {
      onSet(value)
    }
  }

  return (
    <Form.Control as="select" onChange={onChange} value={value || ''}>
      <option value="" hidden>
        {placeholder}
      </option>
      <option value={UNSET_VAL}>{unsetOption}</option>
      {children}
    </Form.Control>
  )
}

export default AdvancedSelect
