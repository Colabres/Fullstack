
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.status(200).json(blogs)
  })
})

// blogsRouter.post('/', (request, response) => {
//     console.log(request.body)
//     const blog = new Blog(request.body)    
//     blog
//       .save()
//       .then(result => {
//         response.status(201).json(result)
//       })
//   })

blogsRouter.post('/', async (request, response) => {
    console.log(request.body)
    //here i try to check if likes are set but i dont like this emplimentation.
    //i take data out of object and set a defalt data for likes then put the data in the blog object... to much in my opinion.
    const { title, author, url, likes = 0 } = request.body;
    
    if (!title || !url) {
      return response.status(400).json({ error: 'Title and URL are required' });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes,
    })
        
    const result = await blog.save()    
    response.status(201).json(result)
     
  })


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)    
    response.status(204).end()     
  })
 
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      likes: body.likes,
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  })
module.exports = blogsRouter