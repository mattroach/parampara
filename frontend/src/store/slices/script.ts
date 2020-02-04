import axios from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Script } from '../../types/scriptTypes';
import { AppThunk } from '../store';

export type ScriptStore = {
  script?: Script
}

let initialState: ScriptStore = {};

const scriptSlice = createSlice({
  name: 'script',
  initialState,
  reducers: {
    updateScript(state, action: PayloadAction<Script>) {
      state.script = action.payload
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
      const script: Script = response.data;

      dispatch(updateScript(script))
    })
}