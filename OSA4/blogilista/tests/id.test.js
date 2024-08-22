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

test('check id exist and _id dose not', async () => {
    //use supertest to fetch response from endpoint (make a get request response object)
    const response = await api.get('/api/blogs')
    const blogs = response.body;

    blogs.forEach(blog => {
      assert(blog.id, 'Expected blog to have id field');
      assert(!blog._id, 'Expected blog not to have _id field');
    })
})


// aftemath close connection with DB
after(async () => {
  await mongoose.connection.close()
})