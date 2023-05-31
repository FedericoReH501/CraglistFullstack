const express = require('express')
require('express-async-errors')
const app = express()
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cragsRouter = require('./controllers/crags')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const falesiaRouter = require('./controllers/falesia')
const mongoUrl = config.MONGO_URI
const bodyParser = require('body-parser')
mongoose.set('strictQuery', false)
mongoose
    .connect(mongoUrl)
    .then(logger.info('connected to mongoDB'))
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })
app.use(bodyParser.json({ limit: '4000kb' }))
app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/falesia', falesiaRouter)
app.use('/api/crags', cragsRouter)
app.use('/api/user', usersRouter)

app.use(middleware.errorHendler)

app.use(middleware.unknownEndpoint)
module.exports = app
