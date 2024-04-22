const cragsRouter = require('express').Router()
const { Crag } = require('../models/crag')

cragsRouter.get('/', async (request, response) => {
    const crags = await Crag.find({}).populate({
        path: 'sectors',
        populate: {
            path: 'vie',
            model: 'Route',
        },
    })
    response.status(200).json(crags)
})

cragsRouter.get('/region', async (request, response) => {})

cragsRouter.post('/', async (request, response) => {
    const {
        name,
        vie,
        exposure,
        region,
        provincia,
        parkingLocation,
        location,
    } = request.body

    const crag = new Crag({
        name: name,
        vie: vie,
        exposure: exposure,
        region: region,
        provincia: provincia,
        parkingLocation: parkingLocation,
        location: location,
    })
    console.log('controllers Crag:', crag)
    const savedcrag = await crag.save()
    response.status(201).json(savedcrag)
})

module.exports = cragsRouter
