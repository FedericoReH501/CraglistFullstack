To show a map with pins representing the crag's position in a React application, you can use popular mapping libraries such as Leaflet or Google Maps JavaScript API. Here's an example using Leaflet:

1. Install the Leaflet library by running the following command in your React project directory:

    ```
    npm install leaflet
    ```

2. Import the required dependencies and set up the map component:

    ```jsx
    import React, { useEffect, useRef } from 'react'
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    const MapComponent = ({ cragObject }) => {
        const mapRef = useRef(null)

        useEffect(() => {
            // Initialize the map
            const map = L.map(mapRef.current).setView(
                [
                    cragObject.cragLocation.latitude,
                    cragObject.cragLocation.longitude,
                ],
                13
            )

            // Add a tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map)

            // Add a marker for the crag location
            L.marker([
                cragObject.cragLocation.latitude,
                cragObject.cragLocation.longitude,
            ]).addTo(map)

            // Cleanup when the component unmounts
            return () => {
                map.remove()
            }
        }, [cragObject])

        return <div ref={mapRef} style={{ height: '400px' }} />
    }

    export default MapComponent
    ```

3. In your React component, import and use the `MapComponent` with the `cragObject` data:

    ```jsx
    import React from 'react'
    import MapComponent from './MapComponent'

    const App = () => {
        const cragObject = {
            cragLocation: {
                latitude: 41.9694,
                longitude: 13.8144,
            },
            parkingLocation: {
                latitude: 41.9685,
                longitude: 13.8152,
            },
            distance: 1.23,
        }

        return (
            <div>
                {/* Other components */}
                <MapComponent cragObject={cragObject} />
            </div>
        )
    }

    export default App
    ```

In this example, the `MapComponent` is a React functional component that renders a `div` element acting as a container for the Leaflet map. The map is initialized and centered on the crag's latitude and longitude coordinates.

The Leaflet tile layer is added using OpenStreetMap tiles. You can customize the tile layer to your preference or use other tile providers.

A marker is added to the map at the crag's location coordinates.

Make sure to adjust the cragObject data with the appropriate latitude and longitude values from your actual crag data.

By rendering the `MapComponent` within your React application, you should see a map displayed with a marker indicating the crag's position.
