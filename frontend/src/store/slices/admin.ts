import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import subscription from 'services/subscription'
import { AppThunk } from 'store/store'
import { AdminDetails } from 'types/adminTypes'

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

export const loadAdmin = (): AppThunk => async (dispatch, getState) => {
  // If the admin is already loaded, skip.
  if (getState().adminStore.admin) return

  const details = await api.getAccountDetails()
  dispatch(updateDetails(details))
}
