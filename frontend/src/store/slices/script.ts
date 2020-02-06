
import { throttle } from 'throttle-debounce';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as api from '../../api';
import { Script, ScriptItem } from '../../types/scriptTypes';
import { AppThunk } from '../store';

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
    }
  }
})

const {
  updateScript,
  clearScript,
  _addItem,
  _updateItem
} = scriptSlice.actions

export default scriptSlice.reducer

export const addItem = (item: ScriptItem): AppThunk => async (dispatch, getState) => {
  dispatch(_addItem(item))
  saveChangesToServer(getState)
}

export const updateItem = (position: number, item: ScriptItem): AppThunk => async (dispatch, getState) => {
  dispatch(_updateItem({ position, item }))
  saveChangesToServer(getState)
}

export const loadScript = (
  scriptId: string,
  version: api.ScriptVersionType
): AppThunk => async (dispatch, getState) => {
  const currentId = getState().scriptStore.script?.id

  console.log(currentId, scriptId)
  if (currentId && scriptId !== currentId) {
    dispatch(clearScript())
  }

  const script = await api.getScript(scriptId, version ? version : api.ScriptVersionType.latest)
  dispatch(updateScript(script))
}

const saveChangesToServer = throttle(3000, false, (getState) => {
  const { script } = getState().scriptStore

  api.updateScript(script.id, script)
})