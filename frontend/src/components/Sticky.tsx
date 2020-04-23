import React, { useEffect, useRef, useState, ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ isSticky: boolean; width_: number }>`
  ${props => (props.isSticky ? `position: fixed; top: 0; width: ${props.width_}px;` : '')}
`

const Placeholder = styled.div<{ show: boolean; height_: number }>`
  height: ${props => (props.show ? props.height_ : 0)}px;
`

type ChildrenArgs = { isSticky: boolean }
type Props = {
  children: (args: ChildrenArgs) => ReactNode
  className?: string
}

const Sticky: React.FunctionComponent<Props> = ({ className, children }) => {
  const [isSticky, setSticky] = useState(false)
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (placeholderRef.current && wrapperRef.current) {
      if (placeholderRef.current.getBoundingClientRect().top <= 0) {
        setContainerHeight(wrapperRef.current.offsetHeight)
        setContainerWidth(wrapperRef.current.offsetWidth)
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  return (
    <>
      <Placeholder ref={placeholderRef} height_={containerHeight} show={isSticky} />
      <Wrapper
        ref={wrapperRef}
        isSticky={isSticky}
        width_={containerWidth}
        className={className}
      >
        {children({ isSticky })}
      </Wrapper>
    </>
  )
}

export default Sticky
