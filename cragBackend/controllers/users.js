const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { userExtractor } = require('../utils/middleware')


usersRouter.get('/',async(request,response)=>{
  /*if(request.user.username !== 'Admin'){
    return response.status(401).json({error:'only the Admin can have the users s list'})
  }*/
  const users = await User.find({})
  response.status(200).json(users)
})

usersRouter.post('/', async (request, response)=>{
  const {username,password,name,email,region} = request.body
  if(password.length<6){
    return  response.status(400).json({error:'Password must be at least 6 caracters'})
  }

  const hash = await bcrypt.hash(password,10)
  const user = new User({
    username:username,
    passwordHash:hash,
    name:name,
    email:email,
    region:region,
    favRegions:[region]
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
  
})

usersRouter.put('/favs/:id',userExtractor ,async (request,response)=>{
  userId = request.user
  console.log('put router:',userId)

const result = await User.findByIdAndUpdate(userId,request.body,{new:true})
console.log('favs region:',request.body)
console.log('result:', result)
return response.status(204).end()  
})

module.exports = usersRouter