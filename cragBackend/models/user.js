const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema= mongoose.Schema(
    {
        username:{
            required:true,
            type: String,
            unique: true,
            minLength:5
        },
        name:{
            required:true,
            type: String,
        },
        surname:String,
        email:{
            required:true,
            type: String,
            unique: true,
        },
        passwordHash:{
            type:String,
            required:true,
            
        },
        region: String,
        vieFatte:[],
        favRegions:[],
        favCrags:[{
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Falesia'
        }]
    }
)
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports= mongoose.model('User',userSchema)