import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionProgress, ProgressItem } from '../../types/sessionProgress';
import { ScriptItemType } from '../../types/scriptTypes';
import { AppThunk } from '../store';

let initialState: SessionProgress = {
  currentItemProcessed: false,
  currentItemId: 0,
  items: []
}

const sessionProgressSlice = createSlice({
  name: 'sessionProgress',
  initialState,
  reducers: {
    progressItem(state, action: PayloadAction<ProgressItem>) {
      const { payload } = action
      state.items = state.items.concat([payload])
      state.currentItemProcessed = true
    },
    incrementCurrentItem(state, action: PayloadAction<number | undefined>) {
      const nextId = action.payload

      state.currentItemId = nextId ? nextId : state.currentItemId + 1
      state.currentItemProcessed = false
    }
  }
})

export const {
  progressItem,
  incrementCurrentItem: progressCurrentItem,
} = sessionProgressSlice.actions

export default sessionProgressSlice.reducer

export const progressItemOnTimer = (
  itemProgress: ProgressItem
): AppThunk => async dispatch => {
  dispatch(progressItem(itemProgress))

  let nextId: number | undefined
  if (itemProgress.type === ScriptItemType.ChooseResponse) {
    const choice = itemProgress.progress.choice
    nextId = itemProgress.item.responses[choice].nextId
  } else if (itemProgress.type === ScriptItemType.Message) {
    nextId = itemProgress.item.nextId
  }

  setTimeout(() => {
    dispatch(progressCurrentItem(nextId))
  }, 2000)
}