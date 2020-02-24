import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { RootState } from 'store/rootReducer'
import { AppThunk } from 'store/store'
import { throttle } from 'throttle-debounce'
import { ScriptActionType, ScriptItemType } from '../../types/scriptTypes'
import { ProgressItem, SessionProgress } from '../../types/sessionProgress'

export const MESSAGE_BASE_DELAY = 2000

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
      const { actionResult: actionProgress } = itemProgress
      let nextId: number | undefined
      if (actionProgress?.type === ScriptActionType.ChooseResponse) {
        const choice = actionProgress.choice

        if (itemProgress.item.action?.type !== ScriptActionType.ChooseResponse)
          throw Error('Corrupted script')

        nextId = itemProgress.item.action.responses[choice].nextId
      } else if (itemProgress.item.type === ScriptItemType.Message) {
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
  }, MESSAGE_BASE_DELAY)

  updateProgressOnServer(getState)
}

// Will load (if exists) or create the progress on the server
export const loadProgressFromServer = (
  scriptId: string,
  email?: string
): AppThunk => async dispatch => {
  const urlParams = new URLSearchParams(window.location.search)
  const referrerCode = urlParams.get('r') || undefined

  const sessionProgress = await api.getOrCreateSessionProgress({ email, scriptId, referrerCode })
  dispatch(updateProgress(sessionProgress))
}

const updateProgressOnServer = throttle(3000, false, (getState: () => RootState) => {
  const { progress } = getState().sessionProgressStore

  if (!progress)
    throw Error('No progress available')

  const { currentItemId, items, id, } = progress

  if (!id) {
    // We must be in preview mode: do not save progress
    return
  }

  api.updateProgress(id, { currentItemId, items })
})