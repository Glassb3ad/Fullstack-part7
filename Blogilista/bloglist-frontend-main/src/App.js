/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef,  useImperativeHandle } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification1 } from './reducers/notificationReducer'
import { initializeBlogs, addBlog } from './reducers/BlogReducer'
import { Switch, Route, useParams, Link } from 'react-router-dom'
//import Users from './components/Users'
import userService from './services/users'

const SingleBlog = ({ user }) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(a => a.id === id)
  if(blog) return (<Blog key={blog.id} blog={blog} user = {user}/>)
  return <></>
}
const SingleUser = ({ users }) => {
  if(!users)return <></>
  const id = useParams().id
  const user = users.find(a => a.id === id)
  if(!user) return <>No such user</>
  return(<div>
    <h2>{user.name}</h2>
    <h3>added blogs</h3>
    <ul>
      {user.blogs.map(a => <li key={a.id}>{ a.title }</li>)}
    </ul>
  </div>)
}

const User = (props) => (
  <tr key = {props.key}>
    <th><Link to={`/users/${props.user.id}`}> {props.user.name} </Link></th>
    <th>{props.user.blogs.length}</th>
  </tr>)

const Users = (props) => {
  const arr = props.users
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>Names</th>
          <th>Number of blogs</th>
        </tr>
        {arr.map(a => <User key={a.id} user = {a}/>)}
      </table>
    </div>
  )
}

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
        <>{user.name} logged in</>
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
  const notification = useSelector(state => state.notification)
  if (notification !== null) return (
    <div className = "noti">
      <p>{notification}</p>
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [users, setUsers] = useState([])
  const blogFormRef = useRef()
  const dispatch = useDispatch()

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
    dispatch(addBlog(newBlog))
    //setBlogs((await blogService.getAll()).sort((a,b) => b.likes-a.likes))
    blogFormRef.current.toggleVisibility()
    dispatch(setNotification1(`${user.name} added a new blog named ${title}`,5))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useEffect(async () => {
    //console.log(users(users))
    //console.log(SingleUser())
    //console.log('hello')
    setUsers(await userService.getAll())
    dispatch(initializeBlogs())
    setUser(JSON.parse(window.localStorage.getItem('loggedUser')))
    //console.log(JSON.parse(window.localStorage.getItem('loggedUser')))
    if(JSON.parse(window.localStorage.getItem('loggedUser')) !== null) blogService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
  }, [])

  let blogs = (useSelector(state => state.blogs)).sort((a,b) => b.likes-a.likes)

  //console.log(users)
  return (
    <div>
      <div>
        <Link style ={{ padding: 5 }}to='/'>Blogs</Link>
        <Link style ={{ padding: 5 }} to='/users'>Users</Link>
        <Login user = {user} username = {username} password={password} setUsername = {setUsername} setPassword = {setPassword} handleLogin = {handleLogin} logOut = {logOut}/>
      </div>
      <h1>Blogs</h1>
      <Notification errorMessage = {errorMessage}/>
      <Switch>
        <Route path = "/users/:id">
          <SingleUser users = {users} />
        </Route>
        <Route path = "/users">
          <Users users={users}/>
        </Route>
        <Route path = "/blogs/:id">
          <SingleBlog user={user}/>
        </Route>
        <Route path="/">
          <h2>All blogs</h2>
          {user !== null && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user = {user}/>
          )}
          <Togglable buttonLabel = "create new blog" ref={blogFormRef}>
            <CreateNewBlog user = {user}   title = {title} setTitle = {setTitle}  author = {author} setAuthor = {setAuthor}  url ={url} setUrl = {setUrl} handlePost = {handlePost}/>
          </Togglable>
        </Route>
      </Switch>
    </div>
  )
}

export default { App, CreateNewBlog }
//blogs.sort((a,b) => b.likes-a.likes)
