const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json('invalid username or password')
    }
    const userForToken = {
        username: username,
        id: user._id,
    }

    const token = jsonwebtoken.sign(userForToken, process.env.SECRET)

    response.status(200).send({
        token,
        username: username,
        name: user.name,
        id: user.id,
        favsRegions: user.favsRegions,
        completed: user.completed,
        workInProg: user.workInProg,
        favsCrags: user.favsCrags,
    })
})

module.exports = loginRouter
