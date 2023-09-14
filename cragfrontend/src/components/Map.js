import React, { useState } from 'react'
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { Box } from '@mui/material'
import 'leaflet/dist/leaflet.css'
const regions = [
    {
        name: 'Lombardy',
        coords: [
            [45.651937, 8.84673],
            [45.602037, 8.978841],
            [45.522071, 9.190989],
            [45.456407, 9.171758],
            // Add more coordinates here to complete the polygon
        ],
    },
]

function Map({ onSelectRegion }) {
    const [selectedRegion, setSelectedRegion] = useState(null)

    const handleRegionClick = (e, region) => {
        setSelectedRegion(region)
        onSelectRegion(region)
    }

    return (
        <Box py={12} sx={{ width: '50vw', height: '0vh', margin: 'auto' }}>
            <MapContainer center={[41.9, 12.49]} zoom={6}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon
                    key={0}
                    positions={regions[0].coords}
                    eventHandlers={{
                        click: (e) => handleRegionClick(e, region),
                    }}
                />
            </MapContainer>
        </Box>
    )
}

export default Map
