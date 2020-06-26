import React, { useState, useRef } from 'react'
import { action } from '@storybook/addon-actions'

import ItemNavigationForm from './ItemNavigationForm'
import { ScriptItem } from 'types/scriptTypes'
import { createItems } from 'test/testData'
import styled from 'styled-components'

export default {
  title: 'ItemNavigationForm',
  component: ItemNavigationForm
}

const Wrapper = styled.div`
  margin: 20px;
`

const testItems: ScriptItem[] = createItems(15)

export const Basic = () => {
  return (
    <Wrapper>
      <ItemNavigationForm items={testItems} position={10} onSelect={action('onSelect')} />
    </Wrapper>
  )
}
