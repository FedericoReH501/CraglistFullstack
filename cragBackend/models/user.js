const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const userSchema = Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        minLength: 5,
    },
    name: {
        required: true,
        type: String,
    },
    surname: String,
    email: {
        required: true,
        type: String,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    region: String,
    level: Number,

    favoritesRegions: [],
    favoritesCrags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Crag',
        },
    ],
    completedRoutes: [
        {
            crag: {
                type: Schema.Types.ObjectId,
                ref: 'Crag',
            },
            sector: {
                type: Schema.Types.ObjectId,
                ref: 'Sector',
            },
            route: {
                type: Schema.Types.ObjectId,
                ref: 'Route',
            },
            completionType: {
                type: String,
                enum: ['onSight', 'flash', 'normal'],
            },
            completionDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    workInProg: [
        {
            crag: {
                type: Schema.Types.ObjectId,
                ref: 'Crag',
            },
            route: {
                type: Schema.Types.ObjectId,
                ref: 'Route',
            },
        },
    ],
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    },
})

module.exports = mongoose.model('User', userSchema)
