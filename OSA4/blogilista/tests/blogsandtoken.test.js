const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const { test, after, beforeEach,describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User({ username: 'testuser', passwordHash: 'hash' })
  await user.save();


  const blog = new Blog({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    user: user._id
  })
  await blog.save()
})

test('blogs are populated with user information', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);


  //expect(response.body).toHaveLength(1);

    const blog = response.body[0];
    console.log('this is what i get')
    console.log(blog)
    assert.strictEqual(blog.user.username, 'testuser')
})
after(async () => {
    await mongoose.connection.close()
  })
