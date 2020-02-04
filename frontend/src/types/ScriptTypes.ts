export type Script = {
  id: string
  version: ScriptVersion
}

export type ScriptVersion = {
  id: string
  allowAnon: boolean
  items: ScriptItem[]
}

export type ScriptItem = MessageItem | ChooseResponseItem | CommentItem

export enum ScriptItemType {
  Message = 'Message', Image = 'Image', ChooseResponse = 'ChooseResponse', Comment = 'Comment'
}

export type MessageItem = {
  type: ScriptItemType.Message
  message: string
  nextId?: number
}

export type CommentItem = {
  type: ScriptItemType.Comment
}

export type ChooseResponseItem = {
  type: ScriptItemType.ChooseResponse
  responses: ResponseChoice[]
}

export type ResponseChoice = {
  message: string
  nextId?: number
}