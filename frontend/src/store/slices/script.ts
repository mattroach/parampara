import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Script, ScriptItemType } from '../../types/scriptTypes'

let initialState: Script = {
  items: [
    { type: ScriptItemType.Message, message: 'Hello you!' },
    { type: ScriptItemType.Message, message: 'Welcome to Parampara' },
    { type: ScriptItemType.Message, message: 'Hows your day?' },
    {
      type: ScriptItemType.ChooseResponse, responses: [
        { message: 'Good' },
        { message: 'Bad', nextId: 5 }
      ]
    },
    { type: ScriptItemType.Message, message: 'Nice to hear!', nextId: 6 },
    { type: ScriptItemType.Message, message: 'Sorry to hear that.' },
    { type: ScriptItemType.Message, message: 'I am emailing you a document. What do you think about that?' },
    //{ type: ScriptItemType.Message., CONTENT: 'Hello! please see <a href="http://">this document</a>' },
    { type: ScriptItemType.Comment },
    { type: ScriptItemType.Message, message: 'Good bye!' },
  ]
};

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    updateScript(state, action: PayloadAction<Script>) {
      state = action.payload;
    },
  }
})

export const {
  updateScript,
} = scriptSlice.actions

export default scriptSlice.reducer