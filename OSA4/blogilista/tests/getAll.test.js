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
    //add data from premade intialbloglist
    await Blog.insertMany(helper.initialBlogs)  
  })

test('get all blogs', async () => {
    //use supertest to fetch response from endpoint (make a get request response object)
    const response = await api.get('/api/blogs')
    //use assert to check if arg1 match arg2
    assert.strictEqual(response.body.length, 6) 
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
// aftemath close connection with DB
after(async () => {
  await mongoose.connection.close()
})