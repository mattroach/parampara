import {
  Action,
  configureStore,
  getDefaultMiddleware,
  ThunkAction
} from '@reduxjs/toolkit'
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler'
import rootReducer, { RootState } from './rootReducer'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

const myErrorHandler = (err: any) => {
  if (err.response?.status === 401) {
    console.info('Auth error in thunk swallowed')
  } else {
    console.error('uncaught error in thunk', err)
    throw err
  }
}

const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({
  onError: myErrorHandler
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [errorHandlerMiddleware, ...getDefaultMiddleware<RootState>()] as const
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
