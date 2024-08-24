
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.status(200).json(blogs)
//   })
// })

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user',{username: 1})
    response.status(200).json(blogs)
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
    console.log('expecting token')
    console.log(request.token)
    //here i try to check if likes are set but i dont like this emplimentation.
    //i take data out of object and set a defalt data for likes then put the data in the blog object... to much in my opinion.
    const { title, author, url, likes = 0 } = request.body;
    if (request.token===null) {
      return response.status(400).json({ error: 'token missing' })
    }
    //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    if (!title || !url) {
      return response.status(400).json({ error: 'Title and URL are required' })
    }

    if (!user) {
      return response.status(401).json({ error: 'User token missing' })
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })
        
    const result = await blog.save()    
    response.status(201).json(result)
     
  })


  
// blogsRouter.delete('/:id', async (request, response) => {
//     await Blog.findByIdAndDelete(request.params.id)    
//     response.status(204).end()     
//   })

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  console.log('Token:', token)
  if (!token) {
    return response.status(401).json({ error: 'no token detected. Try to login first' })
  }  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log("Token decoded:", decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }
    const blogtodelete = await Blog.findById(request.params.id)
    if ( blogtodelete.user.toString() !== decodedToken.id.toString() ){
      return response.status(401).json({ error: 'invalid user' })
    }  
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