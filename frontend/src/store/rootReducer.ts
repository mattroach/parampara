import { combineReducers } from '@reduxjs/toolkit'

import scriptReducer from './slices/script'
import sessionProgressReducer from './slices/sessionProgress'

const rootReducer = combineReducers({
  scriptStore: scriptReducer,
  sessionProgressStore: sessionProgressReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer