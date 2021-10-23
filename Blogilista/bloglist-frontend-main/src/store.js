/* eslint-disable linebreak-style */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notificationReducer1 } from './reducers/notificationReducer.js'
import thunk from 'redux-thunk'
import { blogReducer } from './reducers/BlogReducer.js'

const reducer = combineReducers({
  notification: notificationReducer1,
  blogs: blogReducer
})
const spore = createStore(reducer, composeWithDevTools( applyMiddleware(thunk)))

export default spore
