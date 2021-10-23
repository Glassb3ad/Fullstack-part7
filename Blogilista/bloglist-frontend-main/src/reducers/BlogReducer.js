/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
  if(action.type === 'INIT') return action.data
  if(action.type ==='REMOVE') return state.filter(a => a.id !== action.data)
  if(action.type === 'LIKE') return state.map(a => {return (a.id !== action.data.id) ? a : action.data})
  return state
}

export const addBlog = (blog) => {
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

export const addLike = (blog) => {
  console.log(blog)
  const newBlog = {
    user: { id: blog.user.id,
      name: blog.user.name,
      username: blog.user.username },
    likes: blog.likes +1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    id: blog.id
  }
  return async (dispatch) => {
    //console.log('hello')
    await blogService.updateBlog(newBlog,blog.id)
    //console.log(newBlog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE',
      data: id
    })
    await blogService.deleteBlog(id)
  }
}