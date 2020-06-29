import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'

import ResponseOption from './ResponseOption'

export default {
  title: 'ResponseOption',
  component: ResponseOption,
  decorators: [centered]
}

export const Basic = () => {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <ResponseOption
      onClear={action('onClear')}
      onSubmit={action('onSubmit')}
      value={value}
      setValue={setValue}
    />
  )
}
