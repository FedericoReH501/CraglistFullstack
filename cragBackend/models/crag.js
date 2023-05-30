const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    routeName: { type: String, required: true },
    difficult: { type: String, required: true },
})

const sectorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    routes: [routeSchema],
})

const cragSchema = mongoose.Schema({
    name: String,
    region: String,
    sectors: [sectorSchema],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    access: String,
    exposure: String,
    kind: String,
    parkingLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
})

cragSchema.index({ location: '2dsphere' })
cragSchema.index({ parkingLocation: '2dsphere' })

cragSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Crag', cragSchema)
