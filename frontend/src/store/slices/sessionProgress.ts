import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionProgress } from '../../types/sessionProgress';
import { ScriptItem } from '../../types/scriptTypes';
import { AppThunk } from '../store';

let initialState: SessionProgress = {
  currentItemId: 0,
  items: []
};

const sessionProgressSlice = createSlice({
  name: 'sessionProgress',
  initialState,
  reducers: {
    progressItem(state, action: PayloadAction<ScriptItem>) {
      state.currentItemId = state.currentItemId += 1;

      state.items = state.items.concat([{ item: action.payload }])
    },
  }
})

export const {
  progressItem
} = sessionProgressSlice.actions

export default sessionProgressSlice.reducer

export const progressItemOnTimer = (
  scriptItem: ScriptItem
): AppThunk => async dispatch => {
  setTimeout(() => {
    dispatch(progressItem(scriptItem))
  }, 2000);
}