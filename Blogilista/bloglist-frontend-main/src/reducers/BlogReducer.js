/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  if(action.type === 'INIT') return action.data
  return state
}

export const addBlog = (blog) => {
  console.log('hello')
  console.log(blog)
  return async (dispatch) => {
    await blogService.postNewBlog(blog)
    let blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    let blogs = await blogService.getAll()
    console.log(blogs)
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}
