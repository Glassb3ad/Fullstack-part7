/* eslint-disable linebreak-style */
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notificationReducer1 } from './reducers/notificationReducer.js'
import thunk from 'redux-thunk'

const spore = createStore(notificationReducer1, composeWithDevTools( applyMiddleware(thunk)))

export default spore
