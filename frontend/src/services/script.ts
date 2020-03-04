import { MessageItem, ScriptItemType, ImageItem } from 'types/scriptTypes'
import { uuid } from 'misc'

export const createMessageItem = (message: string): MessageItem => ({
  id: uuid(),
  type: ScriptItemType.Message,
  message
})

export const createImageItem = (data: {
  url: string
  title: string
  width: number
  height: number
}): ImageItem => {
  return {
    id: uuid(),
    type: ScriptItemType.Image,
    ...data
  }
}
