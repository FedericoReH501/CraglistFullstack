const falesiaRouter = require('express').Router()
const axios = require('axios')
const { request, response } = require('express')
const {
    Crag,
    Route,
    Sector,
    sectorSchema,
    routeSchema,
} = require('../models/crag')

const allRegions = [
    16, 43, 45, 25, 30, 21, 3, 22, 26, 47, 46, 36, 42, 38, 32, 33, 27, 19, 44,
    37,
]

let array = []
const fetcher = async (link) => {
    for (let index = 0; index < allRegions.length; index++) {
        const element = allRegions[index]
        const result = await axios.get(`${link}${element}`)
        array.push(result.data)
    }
    return array
}

const cragsFetcher = async (link) => {
    const result = await axios.get(`${link}/#fal_info`)
    return result.data
}

const mongoUploader = async (craglist) => {
    for (let index = 0; index < craglist.length; index++) {
        //per ogni crag
        const crag = craglist[index]
        let sectors = []
        let vie = []
        for (let index = 0; index < crag.sectors.length; index++) {
            //per ogni settore
            const sector = crag.sectors[index]

            for (let index = 0; index < sector.vie.length; index++) {
                //per ogni via
                const via = sector.vie[index]

                const nuovaVia = new Route({ name: via.name, grade: via.grade })
                const savedVia = await nuovaVia.save()
                const id = savedVia._id
                vie.push(id)
            }

            const nuovoSettore = new Sector({
                sectorName: sector.sectorName,
                vie: vie,
            })
            const savedSettore = await nuovoSettore.save()
            const settoreId = savedSettore._id
            sectors.push(settoreId)
            vie = []
        }
        const newcrag = new Crag({
            name: crag.name,
            region: crag.region,
            sectors: sectors,
            access: crag.access,
            exposure: crag.exposure,
            kind: crag.kind,
            parkingLocation: crag.parkingLocation,
            location: crag.location,
            distance: crag.distance,
        })
        await newcrag.save()
        sectors = []
    }
    return { saved: 'saved' }
}

falesiaRouter.get('/', async (request, response) => {
    const result = await fetcher('https://www.falesia.it/section/')
    response.status(200).send(result)
    array = []
})

falesiaRouter.post('/createDb', async (request, response) => {
    const cragList = request.body.cragList
    result = await mongoUploader(cragList)
    response.status(201).json(result)
})

falesiaRouter.put('/', async (request, response) => {
    const link = request.body.link
    const result = await cragsFetcher(link)
    console.log('passed here')
    response.status(200).send(result)
})

module.exports = falesiaRouter
