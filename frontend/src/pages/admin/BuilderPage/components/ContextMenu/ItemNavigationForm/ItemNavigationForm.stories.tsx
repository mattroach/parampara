import { action } from '@storybook/addon-actions'
import React from 'react'
import styled from 'styled-components'
import { createItems } from 'test/testData'
import { ScriptItem } from 'types/scriptTypes'
import ItemNavigationForm from './ItemNavigationForm'

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
