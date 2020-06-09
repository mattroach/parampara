import loadjs from 'loadjs'
import React, { useEffect } from 'react'

const CONFIG_URL = 'https://embed.small.chat/T014D1651D5G014TV7T951.js'
const CSS = 'https://static.small.chat/messenger.css'
const JS = 'https://static.small.chat/messenger.js'

const SmallChat: React.FunctionComponent = () => {
  useEffect(() => {
    loadjs([CONFIG_URL, CSS], () => {
      loadjs([JS], () => {
        console.log('smallchat loaded')
      })
    })
  }, [])

  return null
}

export default SmallChat
