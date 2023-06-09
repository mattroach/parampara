// These must be the first lines in src/index.js
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'

// This must be imported before other components which extend bootstrap styles.:
import './index.scss'

import { Provider } from 'react-redux'
import store from './store/store'

import * as serviceWorker from './serviceWorker'

import api from './api'

api.setAppDispatch(store.dispatch)

const render = () => {
  const AppRouter = require('./AppRouter').default

  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./AppRouter', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
