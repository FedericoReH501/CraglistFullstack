const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./user_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const newUserList = helper.newUserList

describe('user Functionality',()=>{
  beforeEach(async ()=>{
    await User.deleteMany({})
  },40000)
  
  test('new user can be created',async ()=>{
    const newUser = helper.newUserList[0]
     const response = await api.post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    expect(response.body.username).toBe(newUser.username)
    
  })

  describe('When users already presents in DB',()=>{
    beforeEach(async()=>{
      for(let user of newUserList){
        await api.post('/api/users').send(user)
      }
    })
    test('right amount of usere fetched',async()=>{
      const users = await api.get('/api/users')
      expect(users.body).toHaveLength(newUserList.length)
    })
  })

  describe('Login',()=>{
    test('user can login',async ()=>{
      const response = await api.post('/api/login')
      .send(newUserList[0])

      console.log('login Response:',response.body)

    })
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})