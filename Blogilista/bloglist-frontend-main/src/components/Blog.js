
import React, { useState } from 'react'
import Like from './Like'
import { removeBlog } from '../reducers/BlogReducer'
import { useDispatch } from 'react-redux'


const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const tyyli = { borderStyle: 'solid' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const removebutton = () => {
    return(<button id='remove' onClick={handleRemove}>remove</button>)
  }
  const handleRemove = async () => {
    const ok = window.confirm('Are you sure you want to remove ' + blog.title)
    if(ok) dispatch(removeBlog(blog.id))
  }

  //console.log(user)
  //console.log(blog.user.id)

  return (
    <div className = 'blog' style = {tyyli}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author}<button id='view' onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible} className="testDiv">
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} <Like blog = {blog}/></p>
        {user.username === blog.user.username && removebutton()}
      </div>
    </div>
  )
}


export default Blog