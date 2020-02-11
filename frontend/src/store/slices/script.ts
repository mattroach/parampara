
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'store/store'
import { throttle } from 'throttle-debounce'
import api, { PartialScript, ScriptVersionType } from '../../api'
import { Script, ScriptAction, ScriptActionType, ScriptItem } from '../../types/scriptTypes'
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
      if (!state.script)
        throw Error('Script not loaded')

      let { position } = action.payload
      state.script.version.items[position].action = undefined
    },
    _addAction(state, action: PayloadAction<{ action: ScriptAction, position?: number }>) {
      if (!state.script)
        throw Error('Script not loaded')

      let { position } = action.payload

      if (position === undefined)
        position = state.script.version.items.length - 1

      state.script.version.items[position].action = action.payload.action
    },
    _addItem(state, action: PayloadAction<{ item: ScriptItem, position?: number }>) {
      if (!state.script)
        throw Error('Script not loaded')

      const { item, position } = action.payload

      if (position) {
        state.script.version.items.splice(position, 0, item)
      } else {
        state.script.version.items.push(item)
      }


    },
    _updateItem(state, action: PayloadAction<{ position: number, item: ScriptItem }>) {
      if (!state.script)
        throw Error('Script not loaded')

      state.script.version.items[action.payload.position] = action.payload.item
    },
    _removeItem(state, action: PayloadAction<{ position: number }>) {
      if (!state.script)
        throw Error('Script not loaded')

      const { items } = state.script.version
      const { position } = action.payload
      items.splice(position, 1)
    },
    _removeResponseChoice(state, action: PayloadAction<{ position: number, responsePosition: number }>) {
      if (!state.script)
        throw Error('Script not loaded')

      const { items } = state.script.version
      const { position, responsePosition } = action.payload
      const item = items[position]

      if (item.action?.type !== ScriptActionType.ChooseResponse)
        throw Error('Invalid action type')

      if (item.action.responses.length === 1) {
        // There is only one option left, so remove the whole action
        item.action = undefined
      } else {
        item.action.responses.splice(responsePosition, 1)
      }
    },
    _updateResponseOption(state, action: PayloadAction<{ position: number, responsePosition: number, newMsg: string }>) {
      const { position, responsePosition, newMsg } = action.payload
      const itemAction = state.script?.version.items[position].action
      if (itemAction?.type !== ScriptActionType.ChooseResponse)
        throw Error('Script does not exist or trying to edit an invalid action')

      itemAction.responses[responsePosition].message = newMsg
    },
    _appendResponseOption(state, action: PayloadAction<{ position: number, option: string }>) {
      const { position, option } = action.payload
      const itemAction = state.script?.version.items[position].action
      if (itemAction?.type !== ScriptActionType.ChooseResponse)
        throw Error('Script does not exist or trying to edit an invalid action')

      itemAction.responses.unshift({ message: option })
    },
    _updateTitle(state, action: PayloadAction<string>) {
      if (!state.script)
        throw Error('Script not loaded')
      state.script.title = action.payload
    }
  }
})

const {
  updateScript,
  clearScript,
  newResponseChoiceForm,
  cancelResponseChoiceForm,
  newItemForm,
  cancelNewItemForm,
  _addItem,
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
  saveItemsToServer(getState)
}

export const addAction = (action: ScriptAction, position?: number): AppThunk => async (dispatch, getState) => {
  dispatch(_addAction({ action, position }))
  saveItemsToServer(getState)
}

export const addItem = (item: ScriptItem, position?: number): AppThunk => async (dispatch, getState) => {
  dispatch(_addItem({ item, position }))
  saveItemsToServer(getState)
}

export const updateItem = (position: number, item: ScriptItem): AppThunk => async (dispatch, getState) => {
  dispatch(_updateItem({ position, item }))
  saveItemsToServer(getState)
}

export const updateResponseOption = (position: number, responsePosition: number, newMsg: string): AppThunk => async (dispatch, getState) => {
  dispatch(_updateResponseOption({ position, newMsg, responsePosition }))
  saveItemsToServer(getState)
}

export const appendResponseOption = (position: number, option: string): AppThunk => async (dispatch, getState) => {
  dispatch(_appendResponseOption({ position, option }))
  saveItemsToServer(getState)
}

export const removeResponseChoice = (position: number, responsePosition: number): AppThunk => async (dispatch, getState) => {
  dispatch(_removeResponseChoice({ position, responsePosition }))
  saveItemsToServer(getState)
}

export const removeItem = (position: number): AppThunk => async (dispatch, getState) => {
  dispatch(_removeItem({ position }))
  saveItemsToServer(getState)
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

  if (currentId && scriptId !== currentId) {
    dispatch(clearScript())
  }

  const script = await api.getScript(scriptId, version ? version : ScriptVersionType.latest)
  dispatch(updateScript(script))
}

const saveItemsToServer = throttle(3000, false, (getState: () => RootState) => {
  const { script } = getState().scriptStore

  if (!script)
    throw Error('Script not loaded')

  const patch: PartialScript = { version: { items: script.version.items } }

  api.updateScript(script.id, patch)
})