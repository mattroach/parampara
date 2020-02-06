
import { throttle } from 'throttle-debounce'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import api, { PartialScript, ScriptVersionType } from '../../api'
import { Script, ScriptItem, ScriptItemType } from '../../types/scriptTypes'
import { RootState } from '../rootReducer'
import { AppThunk } from 'store/store'

/**
 * This store is used by both the ui and the editor atm. Probably, the ui should use the progress store instead
 */
export type ScriptStore = {
  script?: Script
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
    _addItem(state, action: PayloadAction<ScriptItem>) {
      if (!state.script)
        throw Error('Script not loaded')

      state.script.version.items.push(action.payload)
    },
    _updateItem(state, action: PayloadAction<{ position: number, item: ScriptItem }>) {
      if (!state.script)
        throw Error('Script not loaded')

      state.script.version.items[action.payload.position] = action.payload.item
    },
    _appendResponseOption(state, action: PayloadAction<{ position: number, option: string }>) {
      const { position, option } = action.payload
      const item = state.script?.version.items[position]
      if (!item || item.type !== ScriptItemType.ChooseResponse)
        throw Error('Script does not exist or trying to edit an invalid item')

      item.responses.unshift({ message: option })
    },
  }
})

const {
  updateScript,
  clearScript,
  _addItem,
  _updateItem,
  _appendResponseOption
} = scriptSlice.actions

export default scriptSlice.reducer

export const addItem = (item: ScriptItem): AppThunk => async (dispatch, getState) => {
  dispatch(_addItem(item))
  saveItemsToServer(getState)
}

export const updateItem = (position: number, item: ScriptItem): AppThunk => async (dispatch, getState) => {
  dispatch(_updateItem({ position, item }))
  saveItemsToServer(getState)
}

export const appendResponseOption = (position: number, option: string): AppThunk => async (dispatch, getState) => {
  dispatch(_appendResponseOption({ position, option }))
  saveItemsToServer(getState)
}

export const loadScript = (
  scriptId: string,
  version: ScriptVersionType
): AppThunk => async (dispatch, getState) => {
  const currentId = getState().scriptStore.script?.id

  console.log(currentId, scriptId)
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