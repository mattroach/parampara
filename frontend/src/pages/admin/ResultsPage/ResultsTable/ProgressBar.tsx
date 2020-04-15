import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #e9ecef;
  border-radius: 0.25rem;
  height: 1.15rem;
  line-height: 1.15rem;
`

const Progressed = styled.div<{ progress: number }>`
  background: #55a7ff;
  border-radius: 0.25rem;
  width: ${props => props.progress}%;
  height: 100%;
`

const Label = styled.span`
  width: 100%;
  float: left;
  text-align: center;
`

type Props = {
  progress: number
}

const ProgressBar: React.FunctionComponent<Props> = ({ progress }) => {
  return (
    <Wrapper>
      <Label>{progress + '%'}</Label>
      <Progressed progress={progress} />
    </Wrapper>
  )
}

export default ProgressBar
