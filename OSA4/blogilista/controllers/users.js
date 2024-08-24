const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { request, response } = require('express')
require('express-async-errors')

userRouter.get('/', async (request,response) => {
    const result = await User.find({})
    
    if(result){
        response.status(200).json(result)
    }
})

userRouter.post('/', async (request, response) => {
    console.log(request.body)
  const { username, password } = request.body
  
  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' });
  }
  if (password.length<3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' });
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash
  })
  console.log('i am here ')


  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return response.status(400).json({ error: 'Username must be unique' })
    }
    response.status(500).json({ error: 'An unexpected error occurred' })
  }
})

module.exports = userRouter