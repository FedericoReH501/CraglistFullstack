const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    name: { type: String },
    grade: { type: String },
})

const sectorSchema = new mongoose.Schema({
    sectorName: { type: String },
    vie: [routeSchema],
})

const cragSchema = mongoose.Schema({
    name: String,
    region: String,
    sectors: [sectorSchema],
    distance: Number,
    location: {
        type: {
            type: String,
            enum: ['Point'],
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
        },
        coordinates: {
            type: [Number],
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
