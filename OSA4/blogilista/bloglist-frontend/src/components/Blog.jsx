import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedInUser, handleRemove,testLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [likes, addLike] = useState(blog.likes)
  
  const showWhenVisible = { display: visible ? '' : 'none' }

  const confirmRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log('testing remove func instide a blog')
      handleRemove(blog.id)
    }
  }

  const handleLike = async () => {
    try{
      const updatedBlog = {...blog,likes:likes + 1}
      await blogService.update(blog.id, updatedBlog)
      addLike(likes + 1)
    }
    catch(error){
      console.error('Error updating likes:', error)
    }

  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div > 
        <span data-testid="blog-div">{blog.title} {blog.author}</span><button data-testid="show/hide-button" onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
      </div>
      <div data-testid="hiden-div" style={showWhenVisible}>
      <p>{blog.url}</p>
      {/* <p>{likes}<button onClick={testLike || handleLike }>Like</button></p> */}
      <span data-testid="likes-count">{likes}</span>
      <button data-testid="like-button" onClick={testLike || handleLike}>Like</button>
      <p>{blog.user?.username || 'Unknown user'}</p>
      {loggedInUser && loggedInUser.username === blog.user.username && (
        <button data-testid="remove" onClick={confirmRemove}>Remove</button>
      )}
      </div>
  </div>
)}

export default Blog