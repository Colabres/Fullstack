const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


//prepare for tests
beforeEach(async () => {
    //delete old data from test database
    await Blog.deleteMany({})
    await User.deleteMany({})
  })

test('add new block', async () => {
  console.log('STARTING TEST NOW')
  const newUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

  await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  console.log('USER CREATED')
  //console.log(user1)  
  // Login or create a user and get a valid token
  const loginResponse = await api
      .post('/api/login')
      .send({ username: 'mluukkai', password: 'salainen' })

  const token = loginResponse.body.token

  const newBlog = {
        title: 'new blog',
        author: 'John Doe',
        url: 'http://blog/',
        likes: 0,
      }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
    
    const check = await helper.blogsInDb()
    assert.strictEqual(check.length, 1)
    
})
test('Try to add without token', async () => {
  console.log('STARTING TEST NOW')


  const newBlog = {
        title: 'new blog',
        author: 'John Doe',
        url: 'http://blog/',
        likes: 0,
      }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const check = await helper.blogsInDb()
    assert.strictEqual(check.length, 0)
    
})

//remember to close connection with DB
after(async () => {
  await mongoose.connection.close()
})