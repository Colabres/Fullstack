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
    const newBlog1 = {

        author: 'John Doe',
        url: 'http://blog/'
      }
    const newBlog2 = {
        title: 'new blog',
        author: 'John Doe',

    }
    
    await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)
    
    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)

    
    })

    after(async () => {
        await mongoose.connection.close()
      })
