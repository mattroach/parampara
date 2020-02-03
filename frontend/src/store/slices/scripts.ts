import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'

import { AppThunk } from '../store'

type ListedScript = {
  id: number
  title: string
  created: string
}

type ScriptsStore = {
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
  }
})

const {
  updateScripts,
} = scriptSlice.actions

export default scriptSlice.reducer

export const loadScripts = (
  adminId: string
): AppThunk => async dispatch => {

  axios.get(`/api/script`, { params: { adminId } })
    .then((response) => {
      const scripts: ListedScript[] = response.data

      dispatch(updateScripts(scripts))
    })
}