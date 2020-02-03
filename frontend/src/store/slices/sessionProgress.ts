import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import { throttle } from 'throttle-debounce'

import { SessionProgressStore, SessionProgress, ProgressItem } from '../../types/sessionProgress'
import { ScriptItemType } from '../../types/scriptTypes'
import { AppThunk } from '../store'

let initialState: SessionProgressStore = {
  currentItemProcessed: false,
}

const sessionProgressSlice = createSlice({
  name: 'sessionProgress',
  initialState,
  reducers: {
    updateProgress(state, action: PayloadAction<SessionProgress>) {
      state.progress = action.payload
    },
    progressItem(state, action: PayloadAction<ProgressItem>) {
      if (!state.progress) {
        throw new Error('Trying to progress item when no progress is loaded yet')
      }

      const { payload } = action
      state.progress.items = state.progress.items.concat([payload])
      state.currentItemProcessed = true
    },
    incrementCurrentItem(state, action: PayloadAction<number | undefined>) {
      if (!state.progress) {
        throw new Error('Trying to progress item id when no progress is loaded yet')
      }

      const nextId = action.payload

      state.progress.currentItemId = nextId ? nextId : state.progress.currentItemId + 1
      state.currentItemProcessed = false
    }
  }
})

const {
  updateProgress,
  progressItem,
  incrementCurrentItem,
} = sessionProgressSlice.actions

export default sessionProgressSlice.reducer

export const progressItemOnTimer = (
  itemProgress: ProgressItem
): AppThunk => async (dispatch, getState) => {
  dispatch(progressItem(itemProgress))

  let nextId: number | undefined
  if (itemProgress.type === ScriptItemType.ChooseResponse) {
    const choice = itemProgress.progress.choice
    nextId = itemProgress.item.responses[choice].nextId
  } else if (itemProgress.type === ScriptItemType.Message) {
    nextId = itemProgress.item.nextId
  }

  setTimeout(() => {
    dispatch(incrementCurrentItem(nextId))

    console.log('invoking throttled func')
    updateProgressOnServer(getState)
  }, 2000)
}

// Will load (if exists) or create the progress
export const loadProgress = (
  scriptId: string,
  email?: string
): AppThunk => async dispatch => {
  axios.post('/api/sessionProgress/', { email, scriptId })
    .then((response) => {
      const progress: SessionProgress = response.data

      dispatch(updateProgress(progress))
    })
}

const updateProgressOnServer = throttle(3000, false, (getState) => {
  console.log('throttled func is called')
  const { progress } = getState().sessionProgressStore

  if (!progress)
    throw Error('No progress available')

  const { currentItemId, items } = progress
  axios.put(`/api/sessionProgress/${progress.id}`, { currentItemId, items })
})