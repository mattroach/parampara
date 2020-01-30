import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios';

import { Script } from '../../types/scriptTypes'
import { AppThunk } from '../store';

let initialState: Script = {
  items: []
};

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    updateScript(state, action: PayloadAction<Script>) {
      state.items = action.payload.items;
      console.log('new state', state)
    },
  }
})

export const {
  updateScript,
} = scriptSlice.actions

export default scriptSlice.reducer

export const loadScript = (
  scriptId: string
): AppThunk => async dispatch => {

  axios.get(`/api/script/${scriptId}`)
    .then((response) => {
      dispatch(updateScript(response.data.content))
    })
}