import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { Session } from 'api/types'
import { AppThunk } from 'store/store'

type SelectedSessionMap = {
  [sessionId: string]: boolean
}

export type ScriptsResultsStore = {
  data?: Session[]
  selected: SelectedSessionMap
}

const initialState: ScriptsResultsStore = { selected: {} }

const scriptResultsSlice = createSlice({
  name: 'scriptResults',
  initialState,
  reducers: {
    clearData(state) {
      state.data = undefined
    },
    updateData(state, action: PayloadAction<Session[]>) {
      state.data = action.payload
    },
    removeResponses(state, action: PayloadAction<SelectedSessionMap>) {
      const sessionsMap = action.payload
      state.data = state.data!.filter(s => !sessionsMap[s.id])
    },
    toggleSelect(state, action: PayloadAction<string>) {
      if (state.selected[action.payload]) {
        delete state.selected[action.payload]
      } else {
        state.selected[action.payload] = true
      }
    },
    selectAll(state) {
      state.data!.forEach(s => (state.selected[s.id] = true))
    },
    unselectAll(state) {
      state.selected = {}
    }
  }
})

const {
  clearData,
  updateData,
  toggleSelect,
  selectAll,
  unselectAll,
  removeResponses
} = scriptResultsSlice.actions

export { toggleSelect, selectAll, unselectAll }

export default scriptResultsSlice.reducer

export const loadScriptResponses = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState
) => {
  dispatch(clearData())
  const scriptId = getState().scriptStore.script!.id
  const data = await api.getScriptResponses(scriptId)
  dispatch(updateData(data))
}

export const deleteSelected = (): AppThunk<Promise<void>> => async (
  dispatch,
  getState
) => {
  const scriptId = getState().scriptStore.script!.id
  const selectedMap = getState().scriptResultsStore.selected
  await api.deleteResponses(scriptId, Object.keys(selectedMap))
  dispatch(removeResponses(selectedMap))
  dispatch(unselectAll())
}
