import { ScriptItem, ImageItem, ScriptItemType, MessageItem } from 'types/scriptTypes'
import { uuid } from 'misc'

const getMessage = (function() {
  let pos = -1
  const message = [
    'Hi there!',
    'Welcome to the jungle',
    'Today I will teach you to use a printer. Printers can be the worst, but together we will defeat them.',
    "Printers don't like to take orders",
    "So you're gonna need to be stern",
    'First, turn on the printer',
    'Was that hard?',
    'of course not',
    'Now, talk to it in plain english',
    'Tell it your hopes and dreams',
    'Not so hard was it!'
  ]
  return () => {
    pos++
    if (pos >= message.length) pos = 0
    return message[pos]
  }
})()

export const createImageItem = (): ImageItem => ({
  type: ScriptItemType.Image,
  id: uuid(),
  title: 'my giphy',
  url: '',
  width: 200,
  height: 200
})

export const createMessageItem = (): MessageItem => ({
  type: ScriptItemType.Message,
  id: uuid(),
  message: getMessage()
})

export const createItems = (number: number): ScriptItem[] =>
  [...Array(number)].map((v, i) => createMessageItem())
