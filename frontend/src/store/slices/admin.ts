import axios from 'axios'

import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { AppThunk } from 'store/store'
import { SubscriptionTier } from 'types/adminTypes'
import subscription from 'services/subscription'

type AdminDetails = {
  id: string
  email: string
  subscriptionTier: SubscriptionTier
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
    }
  }
})

export const getSubscription = createSelector(
  (state: AdminStore) => state.admin!.subscriptionTier,
  subscriptionTier => subscription(subscriptionTier)
)

const { updateDetails } = scriptSlice.actions

export default scriptSlice.reducer

export const loadAdmin = (adminId: string): AppThunk => async (dispatch, getState) => {
  // If the admin is already loaded, skip.
  if (getState().adminStore.admin?.id === adminId) return

  axios.get(`/api/admin/${adminId}`).then(response => {
    const details: AdminDetails = response.data

    dispatch(updateDetails(details))
  })
}
