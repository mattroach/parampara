import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { RootState } from 'store/rootReducer'
import { AppThunk } from 'store/store'
import { throttle } from 'throttle-debounce'
import { ScriptActionType, ScriptItem, ScriptItemType } from 'types/scriptTypes'
import { ProgressItem, SessionProgress } from 'types/sessionProgress'
import TimeMe from 'timeme.js'

export const MESSAGE_BASE_DELAY = 1400

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
      if (!progress)
        throw new Error('Trying to progress item when no progress is loaded yet')

      const itemProgress = action.payload
      const { actionResult: actionProgress } = itemProgress
      let nextId: number | undefined
      if (actionProgress?.type === ScriptActionType.ChooseResponse) {
        const choice = actionProgress.choice

        if (itemProgress.item.action?.type !== ScriptActionType.ChooseResponse)
          throw Error('Corrupted script')

        nextId = itemProgress.item.action.responses[choice].nextId
      } else {
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

const calculateDelay = (prevItem: ScriptItem) => {
  let delay = 0

  // Don't add delay if there is an action: If they performed the
  // action then they clearly read it anyways.
  if (!prevItem.action) {
    if (prevItem.type === ScriptItemType.Message) {
      // Average reading speed of most adults is around 250 words per minute. This is 240ms per word
      // We've further sped it up though, as some people read faster and most paramparas have breakpoint
      // actions that allow slow readers to catch up.
      delay += prevItem.message.split(' ').length * 210
    } else {
      delay += MESSAGE_BASE_DELAY + 500 // Image
    }
  }

  const min = MESSAGE_BASE_DELAY - Math.floor(Math.random() * 100)
  const max = 4000
  return Math.max(Math.min(delay, max), min)
}

export const progressItemAndDelayNext = (itemProgress: ProgressItem): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(progressItem(itemProgress))

  setTimeout(() => {
    dispatch(endDelay())
  }, calculateDelay(itemProgress.item))

  updateProgressOnServer(getState)
}

// Will load (if exists) or create the progress on the server
export const loadProgressFromServer = (
  scriptId: string,
  email?: string
): AppThunk => async dispatch => {
  TimeMe.initialize({
    currentPageName: 'session-progress',
    idleTimeoutInSeconds: 15
  })

  const urlParams = new URLSearchParams(window.location.search)
  const referrerCode = urlParams.get('r') || undefined

  const sessionProgress = await api.getOrCreateSessionProgress({
    email,
    scriptId,
    referrerCode
  })
  dispatch(updateProgress(sessionProgress))
}

const updateProgressOnServer = throttle(3000, false, (getState: () => RootState) => {
  const { progress } = getState().sessionProgressStore

  if (!progress) throw Error('No progress available')
  const { currentItemId, items, id } = progress

  if (!id) {
    // We must be in preview mode: do not save progress
    return
  }

  const durationSec = Math.ceil(TimeMe.getTimeOnCurrentPageInSeconds())
  api.updateProgress(id, { currentItemId, items, durationSec })
})
