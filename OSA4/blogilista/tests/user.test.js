const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, after, beforeEach,describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const { request } = require('express')




  beforeEach(async () => {
    await User.deleteMany({})
    //await User.insertMany(helper.initialUsers)  
  })

  test('creation test', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  })

  test('get all', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, 0) 
  })

  test('create bad user', async () => {
    const newUser1 = {
      username: 'mluukkai',
      password: 'sa'
    }
    const newUser2 = {
      username: 'mluukkai',
      password: 'salainen'
    }
    const newUser3 = {
      username: 'mluukkai',
      password: 'salainen'
    }
    await api
    .post('/api/users')
    .send(newUser1)
    .expect(400)

    await api
    .post('/api/users')
    .send(newUser2)
    .expect(201)
    
    await api
    .post('/api/users')
    .send(newUser3)
    .expect(400)

  })

  test('test with valid token', async () => {
    const newUser = {
      username: 'mluukkai',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)


    const loginResponse = await api
    .post('/api/login')    
    .send(newUser)
  
    const token = loginResponse.body.token
    console.log('this is token')
    console.log(token)
    console.log('-'*100)
    result=await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'new blog',
        author: 'John Doe',
        url: 'http://blog/'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      console.log(await helper.blogsInDb())      
  })
  after(async () => {
    await mongoose.connection.close()
  })

