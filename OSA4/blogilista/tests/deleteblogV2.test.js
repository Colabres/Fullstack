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

//i spend allot of time at this test. botom line is that 'Authorisation' is set by 
// frontend and since i dont have a frontend i need to simulate login and extract token. 
//Then i set the token to my request so that middlewere can extract it and put it in request.token 
//so my other function can have it from there. Hope that coment helps me in a future.
//prepare for tests
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})


  })

test('delete a blog', async () => {
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

    console.log('SETUP DONE')
    console.log("Start HERE")
    // await api
    //     .post('/api/login')
    //     .send({ username: 'testuser', password: 'testpassword' })    
    const check1 = await helper.blogsInDb()
    console.log('data in DB')
    console.log(check1)
    assert.strictEqual(check1.length, 1)
    
    await api
        .delete(`/api/blogs/${check1[0].id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const check2 = await helper.blogsInDb()    
    assert.strictEqual(check2.length, 0)

})



// aftemath close connection with DB
after(async () => {
  await mongoose.connection.close()
})