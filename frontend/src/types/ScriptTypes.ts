export type ListedScript = {
  id: string
  title: string
  created: string
}

export type Script = {
  version: ScriptVersion
  allowAnon: boolean
  hasUnpublishedChanges: boolean
  isPublished: boolean
  metaImgUrl: string | null
  metaImgWidth: number | null
  metaImgHeight: number | null
  metaTitle: string | null
  metaDescription: string | null
} & ListedScript

export type ScriptVersion = {
  id: string
  items: ScriptItem[]
}

export type ScriptItem = MessageItem | ImageItem

export type ScriptAction =
  | ChooseResponseAction
  | CommentAction
  | SendEmailAction
  | CollectEmailAction

export enum ScriptItemType {
  Message = 'Message',
  Image = 'Image'
}

export enum ScriptActionType {
  ChooseResponse = 'ChooseResponse',
  Comment = 'Comment',
  CollectEmail = 'CollectEmail',
  SendEmail = 'SendEmail'
}

type BaseItem = {
  id: string
  nextId?: number
  action?: ScriptAction
}

export type MessageItem = {
  type: ScriptItemType.Message
  message: string
} & BaseItem

export type ImageItem = {
  type: ScriptItemType.Image
  url: string
  title: string
  width: number
  height: number
} & BaseItem

export type CommentAction = {
  type: ScriptActionType.Comment
}

export type CollectEmailAction = {
  type: ScriptActionType.CollectEmail
}

export type ChooseResponseAction = {
  type: ScriptActionType.ChooseResponse
  responses: ResponseChoice[]
}

export type ResponseChoice = {
  message: string
  nextId?: number
}

export type SendEmailAction = {
  type: ScriptActionType.SendEmail
  content: string
}
