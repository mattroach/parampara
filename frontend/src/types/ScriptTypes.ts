

export type ScriptStore = {
  script?: Script
}

export type Script = {
  id: string
  scriptId: string
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

// const exampleScript: Script = {
//   items: [
//     { type: ScriptItemType.Message, message: 'Hows your day?' },
//     {
//       type: ScriptItemType.ChooseResponse, responses: [
//         { message: 'Good' },
//         { message: 'Bad', nextId: 3 }
//       ]
//     },
//     { type: ScriptItemType.Message, message: 'Nice to hear!', nextId: 4 },
//     { type: ScriptItemType.Message, message: 'Sorry to hear that.' },
//     { type: ScriptItemType.Message, message: 'I am emailing you a document. What do you think about that?' },
//     //{ type: ScriptItemType.Message., CONTENT: 'Hello! please see <a href="http://">this document</a>' },
//     { type: ScriptItemType.Comment },
//     { type: ScriptItemType.Message, message: 'Good bye!' },
//   ]
// };