import { ScriptActionType, ScriptItem } from './scriptTypes'

export type SessionProgress = {
  id?: string // will be undefined if in preview mode or items are not being saved yet
  currentItemId: number
  items: ProgressItem[]
}

export type ProgressItem = {
  item: ScriptItem
  actionResult?: ActionResult
}

export type ActionResult =
  | ChooseResponseResult
  | MultiChoiceResult
  | CommentResult
  | CollectEmailResult

export type ChooseResponseResult = {
  type: ScriptActionType.ChooseResponse
  choice: number
}

export type MultiChoiceResult = {
  type: ScriptActionType.MultiChoice
  choices: number[]
}

export type CommentResult = {
  type: ScriptActionType.Comment
  content: string
}

export type CollectEmailResult = {
  type: ScriptActionType.CollectEmail
  content: string
}

export type ScriptActionResultMap = {
  [ScriptActionType.Comment]: CommentResult
  [ScriptActionType.CollectEmail]: CollectEmailResult
  [ScriptActionType.ChooseResponse]: ChooseResponseResult
  [ScriptActionType.MultiChoice]: MultiChoiceResult
  [ScriptActionType.SendEmail]: undefined
}
