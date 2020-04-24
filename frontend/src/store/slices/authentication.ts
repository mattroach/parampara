import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'store/store'
import api from 'api'

export type AuthenticationStore = {
  passwordProtected?: boolean
  loginToken?: string
}

const initialState: AuthenticationStore = {}

const scriptResultsSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLoginToken(state, action: PayloadAction<string>) {
      state.loginToken = action.payload
    },
    setPasswordProtected(state, action: PayloadAction<boolean>) {
      state.passwordProtected = action.payload
    }
  }
})

const { setLoginToken, setPasswordProtected } = scriptResultsSlice.actions

export default scriptResultsSlice.reducer

export const checkPasswordRequirement = (): AppThunk<Promise<boolean>> => async (
  dispatch,
  getState
) => {
  const adminId = getState().adminStore.admin!.id
  const response = await api.login(adminId)

  const passwordProtected = !response.success
  dispatch(setPasswordProtected(passwordProtected))
  return passwordProtected
}

export const login = (password: string): AppThunk<Promise<boolean>> => async (
  dispatch,
  getState
) => {
  const adminId = getState().adminStore.admin!.id
  const response = await api.login(adminId, password)

  if (!response.success) return false

  // Should never happen unless no password was required in the first place. The frontend
  // should not be calling this action in the first place when that is the case.
  if (!response.loginToken) throw Error('Login token missing')

  dispatch(setLoginToken(response.loginToken))
  return true
}
