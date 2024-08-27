import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        url: ''
      })
    
      const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
          ...formData,
          [name]: value
        })
      }
    
      const handleSubmit = (event) => {
        event.preventDefault()
        addBlog(formData)    

        setFormData({
          title: '',
          author: '',
          url: ''
        })
      }

    return (
    <div>
    <h2>Create a new blog</h2>
  
    <form onSubmit={handleSubmit}>
    <div>
    <h2>Create new</h2>
      title:
    <input
      name="title"
      value={formData.title}
      onChange={handleInputChange}
      //placeholder="Title"
    />
    </div>
    author:
    <input
      name="author"
      value={formData.author}
      onChange={handleInputChange}
      //placeholder="Author"
    />
    <div>
      url:
    <input
      name="url"
      value={formData.url}
      onChange={handleInputChange}
      //placeholder="Ulr"
    />
    </div>
      <button type="submit">save</button>
    </form>  
      </div>
    )
  }
  
  export default BlogForm

