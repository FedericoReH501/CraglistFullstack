const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    name: { type: String },
    grade: { type: String },
})

const Route = mongoose.model('Route', routeSchema)

module.exports = { Route, routeSchema }
