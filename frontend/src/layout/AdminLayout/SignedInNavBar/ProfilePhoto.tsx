import React from 'react'
import styled from 'styled-components'

type Props = {
  src: string
}

const Photo = styled.span<Props>`
  display: inline-block;
  margin: 0 4px 0 10px;
  height: 34px;
  width: 34px;
  line-height: 36px;
  border-radius: 100%;

  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.src});
`

const ProfilePhoto: React.FunctionComponent<Props> = ({ src }) => (
  <Photo src={src}>&nbsp;</Photo>
)

export default ProfilePhoto
