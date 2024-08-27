import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { NotificationError, NotificationStatus } from './components/Notification'
//import Notification from './components/notification'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [operationStatus, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs.sort() )
  //   )  
  // }, [])
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs);
    })
  }, [])

  const addBlog = async (blogObject) => {
    try {

      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setStatus(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setStatus(null)
      }, 5000)  
    }
    catch(exception){
      console.log(exception)
      setErrorMessage('Error')
      setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      }
   }

   const removeBlog = async (id) => {
    try {

      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))

      setStatus(`deleted`)
      setTimeout(() => {
        setStatus(null)
      }, 5000)  
    }
    catch(exception){
      console.log(exception)
      setErrorMessage('Error')
      setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      }
   }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setStatus('login successful')
      setTimeout(() => {
        setStatus(null)
      }, 5000)
    } catch (exception) {
      console.error('Login failed:', exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser') 
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      <h2>Log in to application</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      <h2>blogs</h2>
      <NotificationStatus message={operationStatus} />
      <NotificationError message={errorMessage} />

    {!user && loginForm()}
      {user && <div>        
       <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
       <Togglable buttonLabel="new blog">
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>        
      </div>
    } 

     <div>
       
       {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} loggedInUser={user} handleRemove={removeBlog}/>
       )}
     </div>


    </div>
  )
}


export default App