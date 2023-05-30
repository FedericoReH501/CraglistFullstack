import axios from 'axios'
import { saveAs } from 'file-saver'

function Crag(
    name,
    region,
    sectors,
    access,
    expo,
    kind,
    location,
    parking,
    distance
) {
    this.name = name
    this.region = region
    this.sectors = sectors
    this.access = access
    this.exposure = expo
    this.kind = kind
    this.parkingLocation = parking
    this.location = location
    this.distance = distance
}
const craglist = []

let access = null
let expo = null
let kind = null
let location = null
let parking = null
let distance = null

function formatCoordinates(coordinatesString) {
    const regex = /([NS])\s*([\d.]+)º\/([EW])\s*([\d.]+)º/
    const matches = coordinatesString.match(regex)

    if (matches && matches.length === 5) {
        const latitudeDirection = matches[1]
        const latitude = parseFloat(matches[2])
        const longitudeDirection = matches[3]
        const longitude = parseFloat(matches[4])

        if (!isNaN(latitude) && !isNaN(longitude)) {
            // Convert latitude and longitude to the appropriate sign based on direction
            const latitudeSign = latitudeDirection === 'S' ? -1 : 1
            const longitudeSign = longitudeDirection === 'W' ? -1 : 1

            // Return an array of [longitude, latitude]
            return [longitude * longitudeSign, latitude * latitudeSign]
        }
    }

    // Return null if the coordinates string is not in the expected format
    return null
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371 // Radius of the Earth in kilometers

    // Convert latitude and longitude to radians
    const lat1Rad = degToRad(lat1)
    const lon1Rad = degToRad(lon1)
    const lat2Rad = degToRad(lat2)
    const lon2Rad = degToRad(lon2)

    // Calculate the differences between coordinates
    const latDiff = lat2Rad - lat1Rad
    const lonDiff = lon2Rad - lon1Rad

    // Calculate the distance using the Haversine formula
    const a =
        Math.sin(latDiff / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c

    return distance
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180)
}

const infoParser = (infoTitle) => {
    switch (infoTitle[0].split(' ')[0]) {
        case 'Esposizione:':
            expo = infoTitle.join(' ').slice(13, -1)
            break
        case 'Accesso:':
            access = infoTitle.join(' ').slice(9)
            break
        case 'Tipo':
            kind = infoTitle.join(' ').slice(13)

            break
        case 'Latitudine/Longitudine':
            if (location) {
                parking = formatCoordinates(infoTitle.join(' ').slice(24, -17))
            } else {
                location = formatCoordinates(infoTitle.join(' ').slice(24, -21))
                console.log('location test', location)
            }
            break
        default:
            return null
    }
}
if (location && parking) {
    console.log('in here!!!!!!!!!')
    const cragLocation = {
        x: location[0],
        y: location[1],
    }

    const parkingLocation = {
        x: parking[0],
        y: parking[1],
    }

    distance = calculateDistance(
        cragLocation.x,
        cragLocation.y,
        parkingLocation.x,
        parkingLocation.y
    )
    console.log('calculate', distance)
} else {
    console.log('Invalid coordinates format')
}
let parser = new DOMParser()
const FalesiaScraper = () => {
    const download = async (e) => {
        e.preventDefault()
        const result = await axios.get('falesia')

        const arrayData = result.data

        for (let index = 0; index < arrayData.length; index++) {
            //per ogni regione
            const element = arrayData[index]
            const doc = parser.parseFromString(element, 'text/html')
            //doc contiene html della pagina, il nome regione e' nel titolo
            //ogni provincia e' contenuta in una tabella
            const stringRegion = doc.querySelectorAll('title')[0].textContent
            const regionLength = stringRegion.length
            const region = stringRegion.slice(0, regionLength - 13)
            console.log('REGION:', region)
            // salvo il nome della regione dal titolo della pagina
            let cragsLinkRaw = doc.querySelectorAll('table.table tbody tr td a') // link alla crag

            for (let index = 0; index < cragsLinkRaw.length; index++) {
                // per ogni crag
                const sectors = []
                const linkRaw = cragsLinkRaw[index]
                const link = linkRaw.href
                const cragName = linkRaw.textContent
                const responseInfo = await axios.put('falesia', { link }) // ritorna html della falesia
                const doc = parser.parseFromString(
                    responseInfo.data,
                    'text/html'
                ) //html con le info
                const infoListRaw = doc.querySelectorAll('ul.list-group li')

                infoListRaw.forEach((l) => {
                    const element = l.textContent
                        .split('\n')
                        .filter((s) => s !== '' && s !== ' ')
                    if (element[0]) {
                        infoParser(element)
                    }
                })

                const responseSectors = await axios.put('falesia', {
                    link: `${link}#al_sett`,
                })
                // ritorna html dei settori
                const docSector = parser.parseFromString(
                    responseSectors.data,
                    'text/html'
                )
                const sectorsRaw = docSector.querySelectorAll(
                    'tbody tr td a.hidden-print'
                )

                for (let index = 0; index < sectorsRaw.length; index++) {
                    //per ogni settore
                    const vie = []
                    const element = sectorsRaw[index]
                    const sectorName = element.textContent
                    const sectorLink = element.href
                    const responseVie = await axios.put('falesia', {
                        link: sectorLink,
                    })
                    const docVie = parser.parseFromString(
                        responseVie.data,
                        'text/html'
                    )
                    const trList = docVie.querySelectorAll('tbody tr') //ogni via e' in un tr

                    for (let index = 0; index < trList.length; index++) {
                        //per ogni via
                        const element = trList[index]
                        const tdList = element.querySelectorAll('td')
                        if (tdList.length > 2) {
                            const name =
                                tdList[2].querySelector('a').textContent
                            const grade = tdList[0]
                                .querySelector('button')
                                .textContent.slice(0, -1)
                            const via = { name, grade }
                            vie.push(via)
                        }
                    }
                    const sector = { sectorName, vie }
                    sectors.push(sector)
                }
                const cragObj = new Crag(
                    cragName,
                    region,
                    sectors,
                    access,
                    expo,
                    kind,
                    location,
                    parking,
                    distance
                )
                craglist.push(cragObj)
                window.localStorage.setItem(
                    'cragList',
                    JSON.stringify(craglist)
                )
                console.log(`${cragObj.name} Saved!`, cragObj)
                console.log('----------------------------------')
            }
            console.log('REGION TERMINATED')
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
            console.log('----------------------------------')
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
        }
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log('TERMINATE')
        console.log('CragList:')
        console.log(craglist)
    }

    const fileCreator = () => {
        const cragList = window.localStorage.getItem('cragList')
        console.log('saving')
        const blob = new Blob([cragList], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, 'BackupDB.txt')
    }
    const dataUploader = async () => {
        const data = JSON.parse(window.localStorage.getItem('cragList'))
        const response = await axios.post('falesia/createDb', {
            cragList: data,
        })
        console.log(response.data)
    }

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <form onSubmit={(e) => download(e)}>
                <button type="submit" id="uploadExcell">
                    Ruba da Falesia.it
                </button>
            </form>
            <button onClick={fileCreator}>save as file</button>
            <button onClick={dataUploader}>Upload in mongo db</button>
        </div>
    )
}
export default FalesiaScraper
