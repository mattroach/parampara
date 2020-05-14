import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk<R = void> = ThunkAction<R, RootState, undefined, Action<string>>

export default store
