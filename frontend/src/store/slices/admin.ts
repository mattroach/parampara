import axios from 'axios'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'

type AdminDetails = {
  id: number
  email: string
}

export type AdminStore = {
  admin?: AdminDetails
}

let initialState: AdminStore = {}

const scriptSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateDetails(state, action: PayloadAction<AdminDetails>) {
      state.admin = action.payload
    },
  }
})

const {
  updateDetails,
} = scriptSlice.actions

export default scriptSlice.reducer

export const loadAdmin = (
  adminId: string
): AppThunk => async dispatch => {

  axios.get(`/api/admin/${adminId}`)
    .then((response) => {
      const details: AdminDetails = response.data

      dispatch(updateDetails(details))
    })
}