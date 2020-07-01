import axios from 'axios'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'
import { ListedScript } from 'types/scriptTypes'
import api from 'api'

export type ScriptsStore = {
  scripts?: ListedScript[]
}

const initialState: ScriptsStore = {}

const scriptSlice = createSlice({
  name: 'scripts',
  initialState,
  reducers: {
    addScript(state, action: PayloadAction<ListedScript>) {
      state.scripts!.unshift(action.payload)
    },
    updateScripts(state, action: PayloadAction<ListedScript[]>) {
      state.scripts = action.payload
    },
    _deleteScript(state, action: PayloadAction<string>) {
      const scriptId = action.payload
      const index = state.scripts!.findIndex(script => script.id === scriptId)
      if (index === -1) throw Error(`Cannot find script with ID ${scriptId}`)
      state.scripts!.splice(index, 1)
    }
  }
})

const { addScript, updateScripts, _deleteScript } = scriptSlice.actions

export default scriptSlice.reducer

export const loadScripts = (): AppThunk => async dispatch => {
  axios.get('/api/script').then(response => {
    const scripts: ListedScript[] = response.data

    dispatch(updateScripts(scripts))
  })
}

export const deleteScript = (
  scriptId: string
): AppThunk<Promise<void>> => async dispatch => {
  await api.deleteScript(scriptId)
  dispatch(_deleteScript(scriptId))
}

export const cloneScript = (
  scriptId: string
): AppThunk<Promise<void>> => async dispatch => {
  const newScript = await api.cloneScript(scriptId)
  dispatch(addScript(newScript))
}
