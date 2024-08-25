import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { NotificationError, NotificationStatus } from './components/Notification'
//import Notification from './components/notification'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')
  const [operationStatus, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: '',
  })
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: formData.title,
        author: formData.author,
        url: formData.url      
      }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setFormData({
        title: '',
        author: '',
        url: '',
      })
      setStatus(`a new blog ${formData.title} by ${formData.author} added`)
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
  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
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
  const blogForm = () => (
    <form onSubmit={addBlog}>
    <div>
    <h2>Create new</h2>
      title:
    <input
      name="title"
      value={formData.title}
      onChange={handleBlogChange}
      //placeholder="Title"
    />

    </div>
    author:
    <input
      name="author"
      value={formData.author}
      onChange={handleBlogChange}
      //placeholder="Author"
    />
    <div>

    </div>

    <div>
      url:
    <input
      name="url"
      value={formData.url}
      onChange={handleBlogChange}
      //placeholder="Ulr"
    />
    </div>

      <button type="submit">save</button>
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
         {blogForm()}
      </div>
    } 

     <div>
       
       {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
       )}
     </div>


    </div>
  )
}


export default App