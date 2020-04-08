import { ScriptActionType, ScriptItem } from './scriptTypes'

export type SessionProgress = {
  id?: string // will be undefined if in preview mode and not saving the progress to the server
  currentItemId: number
  items: ProgressItem[]
}

export type ProgressItem = {
  item: ScriptItem
  actionResult?: ActionResult
}

export type ActionResult = ChooseResponseResult | CommentResult | CollectEmailResult

export type ChooseResponseResult = {
  type: ScriptActionType.ChooseResponse
  choice: number
}

export type CommentResult = {
  type: ScriptActionType.Comment
  content: string
}

export type CollectEmailResult = {
  type: ScriptActionType.CollectEmail
  content: string
}

// TODO: do something like this for better typing
// type TestProgressItemCR = {
//   item: ScriptItem<ChooseResponseAction>
//   actionProgress: ChooseResponseActionProgress
// }
