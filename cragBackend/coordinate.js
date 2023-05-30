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

const cragLocationString = 'N 41.9694º/E 13.8144º'
const parkingLocationString = 'N 41.9685º/E 13.8152º'

const cragCoordinates = formatCoordinates(cragLocationString)
const parkingCoordinates = formatCoordinates(parkingLocationString)

if (cragCoordinates && parkingCoordinates) {
    const cragLocation = {
        x: cragCoordinates[0],
        y: cragCoordinates[1],
    }

    const parkingLocation = {
        x: parkingCoordinates[0],
        y: parkingCoordinates[1],
    }

    const distance = calculateDistance(
        cragLocation.x,
        cragLocation.y,
        parkingLocation.x,
        parkingLocation.y
    )
    console.log(distance) // Output: distance in the same unit as the coordinates
} else {
    console.log('Invalid coordinates format')
}
