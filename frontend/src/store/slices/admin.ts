import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import subscription from 'services/subscription'
import { AppThunk } from 'store/store'
import { AdminDetails } from 'types/adminTypes'

export type AdminStore = {
  authFailure: boolean // true if auth fails at any point
  initAuthFailure: boolean // true if auth fails on initial page load.

  admin?: AdminDetails
}

let initialState: AdminStore = {
  authFailure: false,
  initAuthFailure: false
}

const scriptSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateDetails(state, action: PayloadAction<AdminDetails>) {
      state.admin = action.payload
    },
    setAuthFailure(state) {
      state.authFailure = true
    },
    setInitAuthFailure(state) {
      state.initAuthFailure = true
    }
  }
})

export const getSubscription = createSelector(
  (state: AdminStore) => state.admin!.subscriptionTier,
  subscriptionTier => subscription(subscriptionTier)
)

const { updateDetails, setAuthFailure, setInitAuthFailure } = scriptSlice.actions

export { setAuthFailure }

export default scriptSlice.reducer

export const loadAdmin = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  // If the admin is already loaded, skip.
  if (getState().adminStore.admin) return

  try {
    const details = await api.getAccountDetails()
    dispatch(updateDetails(details))
  } catch (err) {
    if (err.response?.status === 401) {
      dispatch(setInitAuthFailure())
    }
    throw err
  }
}
