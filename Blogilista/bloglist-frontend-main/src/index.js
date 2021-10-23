
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import spore from './store'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <Provider store={spore}>
    <Router>
      <App.App />
    </Router>
  </Provider>,
  document.getElementById('root')
)