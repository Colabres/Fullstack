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

  test('update a blog', async () => {
    const newBlog = {
        title: 'new blog',
        author: 'John Doe',
        url: 'http://blog/'
      }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const check1 = await helper.blogsInDb()
    assert.strictEqual(check1[0].likes, 0)
    
    const update = {
        likes : 5
    }
    await api
        .put(`/api/blogs/${check1[0].id}`)
        .send(update)

    const check2 = await helper.blogsInDb()
    assert.strictEqual(check2[0].likes, 5)
})



// aftemath close connection with DB
after(async () => {
  await mongoose.connection.close()
})