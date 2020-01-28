import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionProgress, ChooseResponseItemProgress } from '../../types/sessionProgress';
import { MessageItem } from '../../types/scriptTypes';
import { AppThunk } from '../store';

let initialState: SessionProgress = {
  currentItemId: 0,
  items: []
};

const sessionProgressSlice = createSlice({
  name: 'sessionProgress',
  initialState,
  reducers: {
    progressMessageItem(state, action: PayloadAction<MessageItem>) {
      const { payload } = action;

      state.currentItemId = payload.nextId ? payload.nextId : state.currentItemId + 1;

      state.items = state.items.concat([{ item: payload }])
    },
    progressChoiceResponseItem(state, action: PayloadAction<ChooseResponseItemProgress>) {
      const { payload } = action;

      const choice = payload.progress.choice;
      const nextId = payload.item.responses[choice].nextId;

      state.currentItemId = nextId ? nextId : state.currentItemId + 1;

      state.items = state.items.concat([payload])
    },
  }
})

export const {
  progressMessageItem,
  progressChoiceResponseItem
} = sessionProgressSlice.actions

export default sessionProgressSlice.reducer

export const progressMessageItemOnTimer = (
  scriptItem: MessageItem
): AppThunk => async dispatch => {
  setTimeout(() => {
    dispatch(progressMessageItem(scriptItem))
  }, 500);
}