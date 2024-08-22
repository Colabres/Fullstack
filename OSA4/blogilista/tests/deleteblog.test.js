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

  test('delete a blog', async () => {
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
    assert.strictEqual(check1.length, 1)
    
    await api
        .delete(`/api/blogs/${check1[0].id}`)
        .expect(204)

    const check2 = await helper.blogsInDb()
    assert.strictEqual(check2.length, 0)
})



// aftemath close connection with DB
after(async () => {
  await mongoose.connection.close()
})