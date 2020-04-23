import { combineReducers } from '@reduxjs/toolkit'
import adminReducer from './slices/admin'
import scriptReducer from './slices/script'
import scriptsReducer from './slices/scripts'
import sessionProgressReducer from './slices/sessionProgress'
import scriptResultsReducer from './slices/scriptResults'
import scriptInsightsReducer from './slices/scriptInsights'

const rootReducer = combineReducers({
  adminStore: adminReducer,
  scriptStore: scriptReducer,
  scriptsStore: scriptsReducer,
  sessionProgressStore: sessionProgressReducer,
  scriptResultsStore: scriptResultsReducer,
  scriptInsightsStore: scriptInsightsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
