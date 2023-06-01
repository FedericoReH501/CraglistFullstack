const mongoose = require('mongoose')

const route = require('./route') // Assuming you have defined the Route model
const routeSchema = route.routeSchema

const sectorSchema = new mongoose.Schema({
    sectorName: { type: String },
    vie: [routeSchema],
})

const Sector = mongoose.model('Sector', sectorSchema)

module.exports = { Sector, sectorSchema }
