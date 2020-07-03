import React, { useRef } from 'react'
import styled from 'styled-components'
import ItemWrap from '../../item-types/ItemWrap'

const Wrapper = styled(ItemWrap).attrs({
  unlimitedWidth: true
})`
  margin: 30px 0;
  text-align: center;
  width: 100%;
`

type Props = {
  children: (onSubmit: () => void) => React.ReactNode
}

const Options: React.FunctionComponent<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const onSubmit = () => {
    document.documentElement.scrollTo({
      top: containerRef.current!.offsetTop,
      behavior: 'smooth'
    })
  }

  return <Wrapper ref={containerRef}>{children(onSubmit)}</Wrapper>
}

export default Options
