import React from 'react'
import { action } from '@storybook/addon-actions'
import centered from '@storybook/addon-centered/react'

import ResponseOption from './ResponseOption'

export default {
  title: 'ResponseOption',
  component: ResponseOption,
  decorators: [centered]
}

export const Basic = () => (
  <ResponseOption onClear={action('onClear')} onSubmit={action('onSubmit')} />
)
