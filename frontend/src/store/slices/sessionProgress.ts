import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { RootState } from 'store/rootReducer'
import { AppThunk } from 'store/store'
import { throttle } from 'throttle-debounce'
import TimeMe from 'timeme.js'
import { ScriptActionType, ScriptItem, ScriptItemType } from 'types/scriptTypes'
import { ProgressItem, SessionProgress } from 'types/sessionProgress'

export const MESSAGE_BASE_DELAY = 1400

type SessionProgressStore = {
  currentItemDelaying: boolean
  progress?: SessionProgress
  isPreviewMode?: boolean
}

const initialState: SessionProgressStore = {
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
      progress.currentItemId = nextId !== undefined ? nextId : progress.currentItemId + 1
      state.currentItemDelaying = true
    },
    endDelay(state) {
      state.currentItemDelaying = false
    },
    initEmptyProgress(state, action: PayloadAction<{ isPreviewMode: boolean }>) {
      state.isPreviewMode = action.payload.isPreviewMode
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
  initEmptyProgress,
  clearProgress
} = sessionProgressSlice.actions

export { initEmptyProgress, clearProgress }

export default sessionProgressSlice.reducer

const getCurrentItemId = (state: RootState) =>
  state.sessionProgressStore.progress?.currentItemId
const getScriptItems = (state: RootState) => state.scriptStore.script!.version.items

export const getNextItem = (state: RootState) => {
  const currentItemId = getCurrentItemId(state)
  return currentItemId !== undefined ? getScriptItems(state)[currentItemId] : undefined
}

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

  const state = getState()
  const { progress, isPreviewMode } = state.sessionProgressStore

  if (isPreviewMode) return

  if (progress!.id) {
    updateProgressOnServer(getState)
  } else {
    console.log('checking for persistence eligibility')

    if (getIsEligibleForPersistence(state)) {
      dispatch(createSessionProgress())
      console.log('persisting progress')
    }
  }
}

/*
 * Whether or not the session is persisted to the backend. We only persist when one of the following is true:
 * - The script is non-anonymous and they provide their email address
 * - The script reaches the 5th message
 * - The user performs an action (e.g. answers a question)
 * - The user gets to the end of the Parampara
 */
const getIsEligibleForPersistence = (state: RootState) => {
  const progress = state.sessionProgressStore.progress!

  if (progress.currentItemId >= 5) return true

  if (progress.items.some(item => Boolean(item.actionResult))) return true

  if (getNextItem(state) === undefined) return true

  return false
}

const hasAction = (items: ProgressItem[]) =>
  items.some(item => Boolean(item.actionResult))

export const initTimer = () => {
  TimeMe.initialize({
    currentPageName: 'session-progress',
    idleTimeoutInSeconds: 15
  })
}

export const createSessionProgress = (email?: string): AppThunk => async (
  dispatch,
  getState
) => {
  const scriptId = getState().scriptStore.script!.id
  const { currentItemId, items } = getState().sessionProgressStore.progress!

  const referrerCode = getReferrerCode()
  const durationSec = getDurationSec()
  const sessionProgress = await api.createSessionProgress({
    email,
    scriptId,
    referrerCode,
    durationSec,
    currentItemId,
    items
  })
  dispatch(updateProgress(sessionProgress))
}

const getReferrerCode = () =>
  new URLSearchParams(window.location.search).get('r') || undefined
const getDurationSec = () => Math.ceil(TimeMe.getTimeOnCurrentPageInSeconds())

const updateProgressOnServer = throttle(3000, false, (getState: () => RootState) => {
  const { progress } = getState().sessionProgressStore

  const { currentItemId, items, id } = progress!

  const durationSec = getDurationSec()
  api.updateProgress(id!, { currentItemId, items, durationSec })
})
