import { ScriptItemType, MessageItem, ChooseResponseItem, CommentItem } from "./scriptTypes"

export type SessionProgress = {
  id?: string // will be undefined if in preview mode and not saving the progress to the server
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