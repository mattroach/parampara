import React from 'react'
import styled from 'styled-components'

const MaxWidth = styled.div`
  max-width: var(--breakpoint-xl);
  margin: 0 auto;
  padding: 0 20px;
`

type Props = {
  className?: string
}

const RootContainer: React.FunctionComponent<Props> = ({ children, className }) => (
  <MaxWidth className={className}>{children}</MaxWidth>
)

export default RootContainer
