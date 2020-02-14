export type Script = {
  id: string
  title: string
  version: ScriptVersion
  allowAnon: boolean
}

export type ScriptVersion = {
  id: string
  items: ScriptItem[]
}

export type ScriptItem = MessageItem | ImageItem

export type ScriptAction = ChooseResponseAction | CommentAction


export enum ScriptItemType {
  Message = 'Message', Image = 'Image'
}

export enum ScriptActionType {
  ChooseResponse = 'ChooseResponse', Comment = 'Comment'
}


export type MessageItem = {
  type: ScriptItemType.Message
  message: string
  nextId?: number
  action?: ScriptAction
}

export type ImageItem = {
  type: ScriptItemType.Image
  nextId?: number
  action?: ScriptAction
}

export type CommentAction = {
  type: ScriptActionType.Comment
}

export type ChooseResponseAction = {
  type: ScriptActionType.ChooseResponse
  responses: ResponseChoice[]
}

export type ResponseChoice = {
  message: string
  nextId?: number
}