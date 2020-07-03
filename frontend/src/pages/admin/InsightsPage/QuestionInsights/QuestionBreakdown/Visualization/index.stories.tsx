import React from 'react'
import { action } from '@storybook/addon-actions'

import Visualization from './index'

export default {
  title: 'Visualization',
  component: Visualization
}

const testData = [
  { answer: 'Apples', numUsers: 53, color: '#333' },
  { answer: 'Potatos', numUsers: 97, color: '#666' },
  { answer: 'Green Onions', numUsers: 132, color: '#999' }
]

export const Basic = () => <Visualization data={testData} onHover={action('onHover')} />
