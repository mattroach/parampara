import { combineReducers } from '@reduxjs/toolkit'

import adminReducer from './slices/admin'
import scriptReducer from './slices/script'
import scriptsReducer from './slices/scripts'
import sessionProgressReducer from './slices/sessionProgress'

const rootReducer = combineReducers({
  adminStore: adminReducer,
  scriptStore: scriptReducer,
  scriptsStore: scriptsReducer,
  sessionProgressStore: sessionProgressReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer