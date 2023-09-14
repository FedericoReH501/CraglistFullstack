import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
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
    const [italyRegions, setItalyRegions] = useState(null)

    useEffect(() => {
        // Load the GeoJSON file at runtime
        fetch('/italy-with-regions_1458.geojson')
            .then((response) => response.json())
            .then((data) => setItalyRegions(data))
            .catch((error) => console.error('Error loading GeoJSON:', error))
    }, [])

    const [selectedRegion, setSelectedRegion] = useState(null)

    const handleRegionClick = (e, region) => {
        setSelectedRegion(region)
        onSelectRegion(region)
    }
    const regions = [
        {
            name: 'Lombardy',
            coords: [
                [45.651937, 8.84673],
                [41.602037, 8.978841],
                [45.522071, 15.190989],
                [41.456407, 15.171758],
                // Add more coordinates here to complete the polygon
            ],
        },
    ]
    if (italyRegions) {
        return (
            <Box py={12} sx={{ width: '40vw', height: '55vw', margin: 'auto' }}>
                <MapContainer center={[40.9, 12.49]} zoom={6}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {italyRegions && (
                        <GeoJSON
                            data={italyRegions}
                            style={regionStyle}
                            onEachFeature={onEachFeature}
                        />
                    )}
                </MapContainer>
            </Box>
        )
    }
}
// Define the style for the regions
const regionStyle = {
    fillColor: 'lightblue',
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.4,
}

// Define a function to handle interactions with each region
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name)
    }
}

export default Map
