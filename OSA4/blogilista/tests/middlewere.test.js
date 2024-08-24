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
    await User.deleteMany({})

  })
test('userExtractor middleware sets user on request', async () => {
    console.log('STARTING TEST NOW')
    const newUser = {
        username: 'mluukkai',
        password: 'salainen'
      }
  
    const user1 = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
    console.log('USER CREATED')
    //console.log(user1)  
    // Login or create a user and get a valid token
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'mluukkai', password: 'salainen' });

    const token = loginResponse.body.token;

    // Make a request to a test endpoint
    // const response = await api
    //     .get('/test')
    //     .set('Authorization', `Bearer ${token}`)
    //     .expect(200)


})

after(async () => {
    await mongoose.connection.close()
  })