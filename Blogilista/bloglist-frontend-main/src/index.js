
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import spore from './store'
import App from './App'

ReactDOM.render(
  <Provider store={spore}>
    <App.App />
  </Provider>,
  document.getElementById('root')
)