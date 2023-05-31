const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
    /*if(request.user.username !== 'Admin'){
    return response.status(401).json({error:'only the Admin can have the users s list'})
  }*/
    const users = await User.find({})
    response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name, surname, level, email } = request.body
    if (password.length < 6) {
        return response
            .status(400)
            .json({ error: 'Password must be at least 6 caracters' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        passwordHash,
        name,
        surname,
        level,
        email,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.put('/:id', userExtractor, async (request, response) => {
    console.log('RECIVED!!!!!!')

    const userId = request.params.id

    const result = await User.findByIdAndUpdate(userId, request.body, {
        new: true,
    })

    return response.status(204).end()
})

module.exports = usersRouter
