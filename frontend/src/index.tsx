import React from 'react';
import ReactDOM from 'react-dom';

// This must be imported before other components which extend bootstrap styles.:
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { Provider } from 'react-redux'
import store from './store/store'

import * as serviceWorker from './serviceWorker';


const render = () => {
  const App = require('./App').default

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
