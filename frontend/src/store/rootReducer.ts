import { combineReducers } from '@reduxjs/toolkit'

import scriptReducer from './slices/script'
import sessionProgressReducer from './slices/sessionProgress'

const rootReducer = combineReducers({
  script: scriptReducer,
  sessionProgress: sessionProgressReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer