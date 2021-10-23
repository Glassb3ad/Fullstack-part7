import React, { useState, useEffect, useRef,  useImperativeHandle  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import PropTypes from 'prop-types'

const Login = (props) => {
  const username = props.username
  const password = props.password
  const user = props.user
  const userNotLogged = () => {
    return (
      <div>
        Login
        <form onSubmit = {props.handleLogin}>
          <div>
            username
            <input id = "username" type="text" value = {username} name="Username" onChange={({ target }) => props.setUsername(target.value)} />
          </div>
          <div>
            password
            <input id='password' type="password" value = {password} name="Password" onChange={({ target }) => props.setPassword(target.value)} />
          </div>
          <button type="submit" id = "login-button">login</button>
        </form>
      </div>
    )
  }
  const userLogged = () => {
    return (
      <>
        <p>{user.name} logged in</p>
        <button type = "button" onClick = {props.logOut}>log out</button>
      </>
    )}
  if (user === null) return userNotLogged()
  else return userLogged()
}

const CreateNewBlog = ( { user, title, author, url, setTitle, setAuthor, setUrl, handlePost }) => {
  if(user !== null){
    return(
      <div>
        <h2>Create new</h2>
        <form onSubmit = {handlePost} id = "form">
          <div>title:<input id='title' type = 'text' value = {title} name = 'title' onChange = {({ target }) => setTitle(target.value)} /></div>
          <div>author: <input id='author' type = 'text' value = {author} name = 'author' onChange = {({ target }) => setAuthor(target.value)}/></div>
          <div>url: <input id='url' type = 'text' value = {url} name = 'url' onChange = {({ target }) => setUrl(target.value)}/></div>
          <button type="submit" id="button">create</button>
        </form>
      </div>
    )}
  else return <></>
}

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button id = 'toggle' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const Notification = (props) => {
  if (props.notiMessage !== null) return (
    <div className = "noti">
      <p>{props.notiMessage}</p>
    </div>
  )
  if (props.errorMessage !== null) return (
    <div className ="err">
      Error: {props.errorMessage}
    </div>
  )
  return <></>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notiMessage, setNotiMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      //console.log(username)
      //console.log(password)
      const userFromServer = await loginService.login({ username,password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userFromServer)
      )
      setUser(userFromServer)
      blogService.setToken(userFromServer.token)
      setUsername('')
      setPassword('')
    } catch(e){
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const handlePost = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    //console.log(newBlog)
    const response = await blogService.postNewBlog(newBlog)
    console.log(response)
    setBlogs((await blogService.getAll()).sort((a,b) => b.likes-a.likes))
    blogFormRef.current.toggleVisibility()
    setNotiMessage(`${user.name} added a new blog named ${title}`)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(() => {
      setNotiMessage(null)
    }, 5000)
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
    )
    setUser(JSON.parse(window.localStorage.getItem('loggedUser')))
    //console.log(JSON.parse(window.localStorage.getItem('loggedUser')))
    if(JSON.parse(window.localStorage.getItem('loggedUser')) !== null) blogService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification errorMessage = {errorMessage} notiMessage = {notiMessage}/>
      <Login user = {user} username = {username} password={password} setUsername = {setUsername} setPassword = {setPassword} handleLogin = {handleLogin} logOut = {logOut}/>
      <h2>All blogs</h2>
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs = {setBlogs} user = {user}/>
      )}
      <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
        <CreateNewBlog user = {user}   title = {title} setTitle = {setTitle}  author = {author} setAuthor = {setAuthor}  url ={url} setUrl = {setUrl} handlePost = {handlePost}/>
      </Togglable>
    </div>
  )
}

export default { App, CreateNewBlog }
