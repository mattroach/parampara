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


//https://rjzaworski.com/2017/09/typescript-react-compose
// type RC<P> = React.SFC<P> | React.ComponentClass<P>
// type HOC<O, P> = (C: RC<O>) => RC<P>

// // compose components from left to right
// export const compose = <P>(C: RC<P>, ...hocs: HOC<any, any>[]): RC<P> =>
//   hocs.reduce((g, f) => f(g), C)