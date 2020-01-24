import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionProgress } from '../../types/sessionProgress';

let initialState: SessionProgress = {
  currentItemId: 0,
  items: []
};

const sessionProgressSlice = createSlice({
  name: 'sessionProgress',
  initialState,
  reducers: {
  }
})

export const {
} = sessionProgressSlice.actions

export default sessionProgressSlice.reducer