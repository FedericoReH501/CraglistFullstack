const cragsRouter = require('express').Router()
const Crag = require('../models/crag')

cragsRouter.get('/', async(request,response)=>{
  const crags = await Crag.find({})
  response.status(200).json(crags)
})

cragsRouter.get('/:region',async (request,response)=>{
  const crags = await Crag.find({region: request.params.region})
  response.status(200).json(crags)
 })

cragsRouter.post('/',async (request, response)=>{
  const {name,vie,esposizione,region,provincia,parkingGPS,locationGPS} = request.body
  
  const crag = new Crag({
    name:name,
    vie:vie,
    esposizione:esposizione,
    region:region,
    provincia:provincia,
    parkingGPS:parkingGPS,
    locationGPS:locationGPS
  })
  const savedcrag = await crag.save()
  response.status(201).json(savedcrag)
})

module.exports = cragsRouter

