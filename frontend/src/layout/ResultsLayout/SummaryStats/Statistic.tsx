import React from 'react'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const StyledCol = styled(Col)`
  padding: 0 5px;
`

const Graphic = styled.div`
  text-align: center;
`

const AspectRatio = styled.div`
  margin: 0 auto;
  width: min(75%, 90px);
  padding-top: min(75%, 90px); /* 1:1 Aspect Ratio */

  position: relative;
`

const Stat = styled.div`
  font-size: 2.3em;
  text-align: center;
`

const Description = styled.div`
  color: var(--dark);
  font-size: 0.7em;
  text-align: center;
  text-transform: uppercase;
`

const StyledImg = styled.img<{ scale?: number }>`
  width: ${({ scale }) => scale || 100}%;
  margin: auto; /* Center it */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

type Props = {
  imgKey: string
  description: string
  scale?: number
  stat?: string | number
  isLoading?: boolean
}
const Statistic: React.FunctionComponent<Props> = ({
  scale,
  imgKey,
  description,
  stat,
  isLoading
}) => {
  const imgSrc = require(`./svgs/${imgKey}.svg`)
  return (
    <StyledCol>
      <Graphic>
        <AspectRatio>
          <StyledImg src={imgSrc} alt={description} scale={scale} />
        </AspectRatio>
      </Graphic>
      <Stat>{isLoading ? '...' : stat}</Stat>
      <Description>{description}</Description>
    </StyledCol>
  )
}

export default Statistic
