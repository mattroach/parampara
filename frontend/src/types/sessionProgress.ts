import { ScriptItemType, MessageItem, ChooseResponseItem, CommentItem } from "./scriptTypes"


export type SessionProgressStore = {
  currentItemDelaying: boolean
  progress?: SessionProgress
}

export type SessionProgress = {
  id: string
  currentItemId: number
  items: ProgressItem[]
}

export type ProgressItem = MessageItemProgress | ChooseResponseItemProgress | CommentItemProgress

export type MessageItemProgress = {
  type: ScriptItemType.Message
  item: MessageItem
}

export type ChooseResponseItemProgress = {
  type: ScriptItemType.ChooseResponse
  item: ChooseResponseItem
  progress: { choice: number }
}

export type CommentItemProgress = {
  type: ScriptItemType.Comment
  item: CommentItem
  progress: { content: string }
}