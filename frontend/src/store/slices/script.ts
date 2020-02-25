
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'store/store'
import { throttle } from 'throttle-debounce'
import api from 'api'
import { PartialScript, ScriptVersionType } from 'api/types'
import { Script, ScriptAction, ScriptActionType, ScriptItem, ChooseResponseAction } from '../../types/scriptTypes'
import { RootState } from '../rootReducer'


/**
 * This store is used by both the ui and the editor atm. Probably, the ui should use the progress store instead
 */
export type ScriptStore = {
  script?: Script

  // If the user clicked "add response choice" on an item, this will be set to the position ID
  // of the item they are adding the response to
  newResponseChoicePosition?: number
  newItemPosition?: number
}

let initialState: ScriptStore = {}

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
    setHasUnpublishedChanges(state, action: PayloadAction<boolean>) {
      state.script!.hasUnpublishedChanges = action.payload
    },
    _configureAllowAnon(state, action: PayloadAction<boolean>) {
      state.script!.allowAnon = action.payload
    },
    newResponseChoiceForm(state, action: PayloadAction<number>) {
      state.newResponseChoicePosition = action.payload
    },
    cancelResponseChoiceForm(state) {
      state.newResponseChoicePosition = undefined
    },
    newItemForm(state, action: PayloadAction<number>) {
      state.newItemPosition = action.payload
    },
    cancelNewItemForm(state) {
      state.newItemPosition = undefined
    },
    _removeAction(state, action: PayloadAction<{ position: number }>) {
      let { position } = action.payload
      state.script!.version.items[position].action = undefined
    },
    _addAction(state, action: PayloadAction<{ action: ScriptAction, position?: number }>) {
      const { items } = state.script!.version
      let { position, action: itemAction } = action.payload

      if (position === undefined)
        position = items.length - 1

      const item = items[position]
      item.action = itemAction

      // If the action is ChooseResponse, clear out the nextId as nextId is not allowed on items
      // with response choices (the nextId is instead defined in the ChooseResponse options)
      if (itemAction.type === ScriptActionType.ChooseResponse)
        item.nextId = undefined
    },
    _addItem(state, action: PayloadAction<{ item: ScriptItem, position?: number }>) {
      const { item, position } = action.payload
      const { items } = state.script!.version

      if (position) {
        items.splice(position, 0, item)
      } else {
        items.push(item)
      }
    },
    _updateItem(state, action: PayloadAction<{ position: number, item: ScriptItem }>) {
      state.script!.version.items[action.payload.position] = action.payload.item
    },
    _updateResponseNextId(state, action: PayloadAction<{ position: number, responsePosition: number, nextId: number }>) {
      const { nextId, responsePosition, position } = action.payload
      const itemAction = state.script!.version.items[position].action! as ChooseResponseAction
      const response = itemAction.responses[responsePosition]

      if (nextId === position + 1)
        response.nextId = undefined
      else
        response.nextId = nextId
    },
    _updateNextId(state, action: PayloadAction<{ position: number, nextId: number }>) {
      const { nextId, position } = action.payload
      const item = state.script!.version.items[position]

      if (nextId === position + 1)
        item.nextId = undefined
      else
        item.nextId = nextId
    },
    _removeItem(state, action: PayloadAction<{ position: number }>) {
      const { items } = state.script!.version
      const { position } = action.payload
      items.splice(position, 1)
    },
    _removeResponseChoice(state, action: PayloadAction<{ position: number, responsePosition: number }>) {
      const { items } = state.script!.version
      const { position, responsePosition } = action.payload
      const itemAction = items[position].action as ChooseResponseAction

      if (itemAction.responses.length === 1) {
        // There is only one option left, so remove the whole action
        items[position].action = undefined
      } else {
        itemAction.responses.splice(responsePosition, 1)
      }
    },
    _updateResponseOption(state, action: PayloadAction<{ position: number, responsePosition: number, newMsg: string }>) {
      const { position, responsePosition, newMsg } = action.payload
      const itemAction = state.script?.version.items[position].action as ChooseResponseAction

      itemAction.responses[responsePosition].message = newMsg
    },
    _appendResponseOption(state, action: PayloadAction<{ position: number, option: string }>) {
      const { position, option } = action.payload
      const itemAction = state.script?.version.items[position].action as ChooseResponseAction

      itemAction.responses.push({ message: option })
    },
    _updateTitle(state, action: PayloadAction<string>) {
      state.script!.title = action.payload
    }
  }
})

const {
  updateScript,
  _configureAllowAnon,
  clearScript,
  setHasUnpublishedChanges,
  newResponseChoiceForm,
  cancelResponseChoiceForm,
  newItemForm,
  cancelNewItemForm,
  _addItem,
  _updateResponseNextId,
  _updateNextId,
  _updateItem,
  _updateResponseOption,
  _appendResponseOption,
  _updateTitle,
  _removeItem,
  _removeResponseChoice,
  _addAction,
  _removeAction,
} = scriptSlice.actions

export {
  newResponseChoiceForm,
  cancelResponseChoiceForm,
  newItemForm,
  cancelNewItemForm,
}

export default scriptSlice.reducer

export const removeAction = (position: number): AppThunk => async (dispatch, getState) => {
  dispatch(_removeAction({ position }))
  dispatch(scriptContentUpdated())
}

export const addAction = (action: ScriptAction, position?: number): AppThunk => async (dispatch, getState) => {
  dispatch(_addAction({ action, position }))
  dispatch(scriptContentUpdated())
}

export const addItem = (item: ScriptItem, position?: number): AppThunk => async (dispatch, getState) => {
  dispatch(_addItem({ item, position }))
  dispatch(scriptContentUpdated())
}

export const updateResponseNextId = (position: number, responsePosition: number, nextId: number): AppThunk => async (dispatch, getState) => {
  dispatch(_updateResponseNextId({ position, responsePosition, nextId }))
  dispatch(scriptContentUpdated())
}

export const updateNextId = (position: number, nextId: number): AppThunk => async (dispatch, getState) => {
  dispatch(_updateNextId({ position, nextId }))
  dispatch(scriptContentUpdated())
}

export const updateItem = (position: number, item: ScriptItem): AppThunk => async (dispatch, getState) => {
  dispatch(_updateItem({ position, item }))
  dispatch(scriptContentUpdated())
}

export const updateResponseOption = (position: number, responsePosition: number, newMsg: string): AppThunk => async (dispatch, getState) => {
  dispatch(_updateResponseOption({ position, newMsg, responsePosition }))
  dispatch(scriptContentUpdated())
}

export const appendResponseOption = (position: number, option: string): AppThunk => async (dispatch, getState) => {
  dispatch(_appendResponseOption({ position, option }))
  dispatch(scriptContentUpdated())
}

export const removeResponseChoice = (position: number, responsePosition: number): AppThunk => async (dispatch, getState) => {
  dispatch(_removeResponseChoice({ position, responsePosition }))
  dispatch(scriptContentUpdated())
}

export const removeItem = (position: number): AppThunk => async (dispatch, getState) => {
  dispatch(_removeItem({ position }))
  dispatch(scriptContentUpdated())
}

export const updateTitle = (scriptId: string, title: string): AppThunk => async (dispatch) => {
  api.updateScript(scriptId, { title })
    .then(() => dispatch(_updateTitle(title)))
}

export const loadScript = (
  scriptId: string,
  version: ScriptVersionType
): AppThunk => async (dispatch, getState) => {
  const currentId = getState().scriptStore.script?.id

  // If the script is already loaded, skip.
  if (getState().scriptStore.script?.id === scriptId)
    return

  // If requesting to load a different script, clear the existing one right away
  if (currentId && scriptId !== currentId) {
    dispatch(clearScript())
  }

  const script = await api.getScript(scriptId, version ? version : ScriptVersionType.latest)
  dispatch(updateScript(script))
}

export const publishScript = (): AppThunk => async (dispatch, getState) => {
  dispatch(setHasUnpublishedChanges(false))
  await api.publishScript(getState().scriptStore.script!.id)
}

export const configureAllowAnon = (allowAnon: boolean): AppThunk => async (dispatch, getState) => {
  api.updateScript(getState().scriptStore.script!.id, { allowAnon })

  // Not ideal but we pro-activly change the value even before the server responds.
  // TODO we should handle the failure case.
  dispatch(_configureAllowAnon(allowAnon))
}

const scriptContentUpdated = (): AppThunk => async (dispatch, getState) => {
  dispatch(setHasUnpublishedChanges(true))
  updateScriptOnServer(getState)
}

const updateScriptOnServer = throttle(3000, false, (getState: () => RootState) => {
  const { script } = getState().scriptStore

  if (!script)
    throw Error('Script not loaded')

  const patch: PartialScript = { version: { items: script.version.items } }

  api.updateScript(script.id, patch)
})
