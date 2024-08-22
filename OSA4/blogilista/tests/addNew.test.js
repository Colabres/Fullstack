const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


//prepare for tests
beforeEach(async () => {
    //delete old data from test database
    await Blog.deleteMany({})
  })

test('add new block', async () => {
    const newBlog = {
        title: 'new blog',
        author: 'John Doe',
        url: 'http://blog/',
        likes: 0,
      }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const check = await helper.blogsInDb()
    assert.strictEqual(check.length, 1)
})


// aftemath close connection with DB
after(async () => {
  await mongoose.connection.close()
})