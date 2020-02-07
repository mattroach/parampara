import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import { throttle } from 'throttle-debounce'

import { SessionProgress, ProgressItem } from '../../types/sessionProgress'
import { ScriptItemType } from '../../types/scriptTypes'
import { AppThunk } from 'store/store'

type SessionProgressStore = {
  currentItemDelaying: boolean
  progress?: SessionProgress
}

let initialState: SessionProgressStore = {
  currentItemDelaying: false
}

const sessionProgressSlice = createSlice({
  name: 'sessionProgress',
  initialState,
  reducers: {
    updateProgress(state, action: PayloadAction<SessionProgress>) {
      state.progress = action.payload
    },
    progressItem(state, action: PayloadAction<ProgressItem>) {
      const { progress } = state
      if (!progress) {
        throw new Error('Trying to progress item when no progress is loaded yet')
      }

      const itemProgress = action.payload
      let nextId: number | undefined
      if (itemProgress.type === ScriptItemType.ChooseResponse) {
        const choice = itemProgress.progress.choice
        nextId = itemProgress.item.responses[choice].nextId
      } else if (itemProgress.type === ScriptItemType.Message) {
        nextId = itemProgress.item.nextId
      }

      progress.items = progress.items.concat([itemProgress])
      progress.currentItemId = nextId ? nextId : progress.currentItemId + 1
      state.currentItemDelaying = true
    },
    endDelay(state) {
      state.currentItemDelaying = false
    },
    initPreviewProgress(state) {
      state.progress = {
        currentItemId: 0,
        items: []
      }
    },
    clearProgress(state) {
      state.progress = undefined
    }
  }
})

const {
  updateProgress,
  progressItem,
  endDelay,
  initPreviewProgress,
  clearProgress
} = sessionProgressSlice.actions

export { initPreviewProgress, clearProgress }

export default sessionProgressSlice.reducer

export const progressItemAndDelayNext = (
  itemProgress: ProgressItem
): AppThunk => async (dispatch, getState) => {
  dispatch(progressItem(itemProgress))

  setTimeout(() => {
    dispatch(endDelay())
  }, 2000)

  updateProgressOnServer(getState)
}

// Will load (if exists) or create the progress on the server
export const loadProgressFromServer = (
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
  const { progress } = getState().sessionProgressStore

  if (!progress)
    throw Error('No progress available')

  const { currentItemId, items, id } = progress

  if (!id) {
    // We must be in preview mode: do not save progress
    return
  }

  axios.put(`/api/sessionProgress/${id}`, { currentItemId, items })
})