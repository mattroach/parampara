import React from 'react'
import Linkify from 'react-linkify'

const componentDecorator = (href: string, text: string, key: number) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

const ChatFormat: React.FunctionComponent = ({ children }) => {
  return (
    <Linkify componentDecorator={componentDecorator}>{children}</Linkify>
  )
}

export default ChatFormat