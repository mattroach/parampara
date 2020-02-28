import axios from 'axios'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'
import { ListedScript } from 'types/scriptTypes'
import api from 'api'

export type ScriptsStore = {
  scripts?: ListedScript[]
}

let initialState: ScriptsStore = {}

const scriptSlice = createSlice({
  name: 'scripts',
  initialState,
  reducers: {
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

const { updateScripts, _deleteScript } = scriptSlice.actions

export default scriptSlice.reducer

export const loadScripts = (adminId: string): AppThunk => async dispatch => {
  axios.get(`/api/script`, { params: { adminId } }).then(response => {
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
