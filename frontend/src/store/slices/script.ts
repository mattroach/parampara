import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { PartialScript, ScriptVersionType } from 'api/types'
import deepEqual from 'fast-deep-equal'
import ScriptRefresh from 'services/ScriptRefresh'
import { AppThunk } from 'store/store'
import { throttle } from 'throttle-debounce'
import {
  ChooseResponseAction,
  Script,
  ScriptAction,
  ScriptActionType,
  ScriptItem,
  MultiSelectAction
} from '../../types/scriptTypes'

// Used for functions which operate on both action types, defined here for convenience
type ResponseActionUnion = ChooseResponseAction | MultiSelectAction

export type NewAction = {
  position: number
  type: ScriptActionType.MultiSelect | ScriptActionType.ChooseResponse
}

/**
 * This store is used by both the ui and the editor atm.
 */
export type ScriptStore = {
  script?: Script

  // If the user is trying to add a new action such as response or multi choice,
  // this will include information on where it is being added
  newAction?: NewAction

  newItemPosition?: number
  hasUnpushedChanges: boolean
}

const initialState: ScriptStore = { hasUnpushedChanges: false }

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    updateScript(state, action: PayloadAction<Script>) {
      state.script = action.payload
    },
    clearScript(state) {
      state.script = undefined
    },
    updateScriptPartial(state, action: PayloadAction<Partial<Script>>) {
      state.script = {
        ...state.script!,
        ...action.payload
      }
    },
    updateScriptItems(state, action: PayloadAction<ScriptItem[]>) {
      state.script!.version.items = action.payload
    },
    setHasUnpushedChanges(state, action: PayloadAction<boolean>) {
      state.hasUnpushedChanges = action.payload
    },
    setHasUnpublishedChanges(state, action: PayloadAction<boolean>) {
      const hasUnpublishedChanges = action.payload
      state.script!.hasUnpublishedChanges = hasUnpublishedChanges

      if (!hasUnpublishedChanges) {
        state.script!.isPublished = true
      }
    },
    newAction(state, action: PayloadAction<NewAction>) {
      state.newAction = action.payload
    },
    cancelResponseChoiceForm(state) {
      state.newAction = undefined
    },
    newItemForm(state, action: PayloadAction<number>) {
      state.newItemPosition = action.payload
    },
    cancelNewItemForm(state) {
      state.newItemPosition = undefined
    },
    removeAction(state, action: PayloadAction<number>) {
      const position = action.payload
      state.script!.version.items[position].action = undefined
    },
    addAction(state, action: PayloadAction<{ action: ScriptAction; position?: number }>) {
      const { items } = state.script!.version
      let { position, action: itemAction } = action.payload

      if (position === undefined) position = items.length - 1

      const item = items[position]
      item.action = itemAction

      // If the action is ChooseResponse, clear out the nextId as nextId is not allowed on items
      // with response choices (the nextId is instead defined in the ChooseResponse options)
      if (itemAction.type === ScriptActionType.ChooseResponse) item.nextId = undefined
    },
    addItem(state, action: PayloadAction<{ item: ScriptItem; position?: number }>) {
      const { item, position } = action.payload
      const { items } = state.script!.version

      if (position !== undefined) {
        items.splice(position, 0, item)
        updateNextIds(items, position, 1)
      } else {
        items.push(item)
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      const { items } = state.script!.version
      const position = action.payload
      items.splice(position, 1)
      updateNextIds(items, position, -1)
    },
    updateItem(state, action: PayloadAction<{ position: number; item: ScriptItem }>) {
      state.script!.version.items[action.payload.position] = action.payload.item
    },
    updateResponseNextId(
      state,
      action: PayloadAction<{
        position: number
        responsePosition: number
        nextId: number
      }>
    ) {
      const { nextId, responsePosition, position } = action.payload
      const itemAction = state.script!.version.items[position]
        .action! as ChooseResponseAction
      const response = itemAction.responses[responsePosition]

      response.nextId = nextId
    },
    updateNextId(state, action: PayloadAction<{ position: number; nextId: number }>) {
      const { nextId, position } = action.payload
      const item = state.script!.version.items[position]

      item.nextId = nextId
    },
    removeResponseChoice(
      state,
      action: PayloadAction<{ position: number; responsePosition: number }>
    ) {
      const { items } = state.script!.version
      const { position, responsePosition } = action.payload
      const itemAction = items[position].action as ResponseActionUnion

      if (itemAction.responses.length === 1) {
        // There is only one option left, so remove the whole action
        items[position].action = undefined
      } else {
        itemAction.responses.splice(responsePosition, 1)
      }
    },
    updateResponseOption(
      state,
      action: PayloadAction<{
        position: number
        responsePosition: number
        newMsg: string
      }>
    ) {
      const { position, responsePosition, newMsg } = action.payload
      const itemAction = state.script?.version.items[position]
        .action as ResponseActionUnion

      itemAction.responses[responsePosition].message = newMsg
    },
    appendResponseOption(
      state,
      action: PayloadAction<{ position: number; option: string }>
    ) {
      const { position, option } = action.payload
      const itemAction = state.script?.version.items[position]
        .action as ResponseActionUnion

      itemAction.responses.push({ message: option })
    }
  }
})

const updateNextIds = (items: ScriptItem[], position: number, change: 1 | -1) => {
  items.forEach((item, i) => {
    if (item.nextId !== undefined && item.nextId >= position) {
      item.nextId += change
    }
    if (item.action && item.action.type === ScriptActionType.ChooseResponse) {
      item.action.responses.forEach(response => {
        if (response.nextId !== undefined && response.nextId >= position) {
          response.nextId += change
        }
      })
    }
  })
}

const {
  updateScript,
  clearScript,
  setHasUnpublishedChanges,
  setHasUnpushedChanges,
  newAction,
  cancelResponseChoiceForm,
  newItemForm,
  cancelNewItemForm,
  updateScriptPartial,
  updateScriptItems,
  addItem,
  updateResponseNextId,
  updateNextId,
  updateItem,
  updateResponseOption,
  appendResponseOption,
  removeItem,
  removeResponseChoice,
  addAction,
  removeAction
} = scriptSlice.actions

export {
  updateScriptPartial,
  newAction,
  cancelResponseChoiceForm,
  newItemForm,
  cancelNewItemForm,
  addItem,
  updateResponseNextId,
  updateNextId,
  updateItem,
  updateResponseOption,
  appendResponseOption,
  removeItem,
  removeResponseChoice,
  addAction,
  removeAction
}

export default scriptSlice.reducer

export const updateTitle = (
  scriptId: string,
  title: string
): AppThunk => async dispatch => {
  api
    .updateScript(scriptId, { title })
    .then(() => dispatch(updateScriptPartial({ title })))
}

export const loadScript = (
  scriptId: string,
  version: ScriptVersionType
): AppThunk => async (dispatch, getState) => {
  const currentId = getState().scriptStore.script?.id

  // If the script is already loaded, skip.
  if (currentId === scriptId) return

  // If requesting to load a different script, clear the existing one right away
  if (currentId && scriptId !== currentId) {
    dispatch(clearScript())
  }

  const script = await api.getScript(
    scriptId,
    version ? version : ScriptVersionType.latest
  )
  dispatch(updateScript(script))
}

export const publishScript = (): AppThunk => async (dispatch, getState) => {
  dispatch(setHasUnpublishedChanges(false))
  await api.publishScript(getState().scriptStore.script!.id)
}

export const saveAndUpdatePartialScript = (
  script: Partial<Script>
): AppThunk<Promise<void>> => async (dispatch, getState) => {
  await api.updateScript(getState().scriptStore.script!.id, script)
  dispatch(updateScriptPartial(script))
}

export const configureAllowAnon = (allowAnon: boolean): AppThunk => async (
  dispatch,
  getState
) => {
  api.updateScript(getState().scriptStore.script!.id, { allowAnon })

  // Not ideal but we pro-activly change the value even before the server responds.
  // TODO we should handle the failure case.
  dispatch(updateScriptPartial({ allowAnon }))
}

export const scriptContentUpdated = (): AppThunk => async (dispatch, getState) => {
  dispatch(setHasUnpublishedChanges(true))
  dispatch(setHasUnpushedChanges(true))
  updateScriptOnServer(dispatch, getState)
}

const updateScriptOnServer = throttle(3000, false, async (dispatch, getState) => {
  const { script } = getState().scriptStore

  if (!script) throw Error('Script not loaded')

  const patch: PartialScript = { version: { items: script.version.items } }

  console.log('pushing changes')
  await api.updateScript(script.id, patch)
  dispatch(setHasUnpushedChanges(false))
})

export const startScriptRefresh = (): AppThunk<ScriptRefresh<ScriptItem[]>> => (
  dispatch,
  getState
) => {
  const pull = async () =>
    (await api.getScript(getState().scriptStore.script!.id, ScriptVersionType.draft))
      .version.items

  const isOkToPull = () => !getState().scriptStore.hasUnpushedChanges

  const commit = (items: ScriptItem[]) => {
    const prevItems = getState().scriptStore.script!.version.items
    if (deepEqual(items, prevItems)) {
      console.debug('No changes to items, not committing')
    } else {
      console.log('commiting changes to store')
      dispatch(updateScriptItems(items))
    }
  }

  const scriptRefresher = new ScriptRefresh(pull, isOkToPull, commit)
  scriptRefresher.startRefresh()
  return scriptRefresher
}

export const addCommentAction = (position?: number) =>
  addAction({
    action: { type: ScriptActionType.Comment },
    position
  })

export const addCollectEmailAction = (position?: number) =>
  addAction({
    action: { type: ScriptActionType.CollectEmail },
    position
  })

export const addSendEmailAction = (position?: number) =>
  addAction({
    action: {
      type: ScriptActionType.SendEmail,
      content: 'http://www.example.com/my-document'
    },
    position
  })
