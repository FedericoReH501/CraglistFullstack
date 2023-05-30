To allow users to specify how a route was completed (e.g., 'onSight', 'flash', 'normal'), you can modify the `completedRoutes` array to include an additional property to store the completion type. Here's an updated version of the user schema:

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    favoriteCrags: [
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
            route: {
                type: Schema.Types.ObjectId,
                ref: 'Crag.route',
            },
            completionType: {
                type: String,
                enum: ['onSight', 'flash', 'normal'],
            },
        },
    ],
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

In this updated schema, the `completedRoutes` array now includes an additional property called `completionType`. It is defined as a string type and constrained to three possible values: 'onSight', 'flash', and 'normal'. You can add more options if needed.

When saving a completed route for a user, you can include
