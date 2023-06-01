const mongoose = require('mongoose')
// Assuming you have created a separate file for the Crag model
const Crag = require('./crag')

// Connect to MongoDB
mongoose
    .connect(
        'mongodb+srv://federicore1996:sg24yCV35LX2yhqj@craglistdb.8sbimzs.mongodb.net/CragAPP?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log('Connected to MongoDB')
        Crag.findById('6475f5393bc93184f7940fc6').then((c) =>
            console.log(c.name)
        )
    })
