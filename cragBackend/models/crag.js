const mongoose = require('mongoose')

const cragSchema = mongoose.Schema({
  name: String,
  region: String,
  sectors:[],
  access:String,
  exposition: String,
  kind:String,
  parkingGps:{type:String,
              default:'diocan'},
  locationGps:String,

})

cragSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

module.exports = mongoose.model('Crag',cragSchema)
