import { ScriptItem, ScriptItemType } from "./scriptTypes";

export type SessionProgress = {
  currentItemId: number;
  items: ProgressItem[];
};

export type ProgressItem = {
  item: ScriptItem;
  progress?: { // TODO should be stronger typing
    choice?: number;
    content?: string;
  }
}

const exampleProgress: SessionProgress = {
  currentItemId: 4,
  items: [
    { item: { type: ScriptItemType.Message, message: 'Hows your day?' } },
    {
      item: {
        type: ScriptItemType.ChooseResponse, responses: [
          { message: 'Good' },
          { message: 'Bad' }
        ]
      }, progress: {choice: 0}
    },
    { item: { type: ScriptItemType.Message, message: 'Nice to hear!' } },
    { item: { type: ScriptItemType.Comment }, progress: {content: 'This is my freeform response'}},
  ]
}