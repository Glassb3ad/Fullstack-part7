/* eslint-disable linebreak-style */
import { addLike } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'

import React from 'react'
const Like = ({ blog }) => {
  const dispatch = useDispatch()
  return (
    <button id='like' type="button" onClick= {() => {dispatch(addLike(blog))}}>like</button>
  )
}

export default Like