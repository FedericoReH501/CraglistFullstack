```js
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  routeName: { type: String, required: true },
  difficult: { type: String, required: true },
});

const sectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  routes: [routeSchema],
});

const cragSchema = new mongoose.Schema({
  sectors: [sectorSchema],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

cragSchema.index({ location: "2dsphere" }); // Create a geospatial index on the 'location' field

const Crag = mongoose.model("Crag", cragSchema);

module.exports = Crag;
```

In this updated schema, a new field called location is added to the Crag schema. The location field is an object with two properties: type and coordinates. The type property is set to 'Point' to indicate that it represents a single point location. The coordinates property is an array of two numbers representing the latitude and longitude of the GPS coordinates.

The line cragSchema.index({ location: '2dsphere' }) creates a geospatial index on the location field, enabling efficient geospatial queries on that field.

By using this approach, you can store GPS coordinates for each Crag and utilize geospatial queries to retrieve Crags based on their proximity to a given location in the frontend.

```javascript
function formatCoordinates(coordinatesString) {
  // Extract latitude and longitude values from the string
  const regex = /N\s*([\d.]+)°\/E\s*([\d.]+)°/;
  const matches = coordinatesString.match(regex);

  if (matches && matches.length === 3) {
    const latitude = parseFloat(matches[1]);
    const longitude = parseFloat(matches[2]);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Return an array of [longitude, latitude]
      return [longitude, latitude];
    }
  }

  // Return null if the coordinates string is not in the expected format
  return null;
}

// Example usage:
const coordinatesString = "N 41.9694º/E 13.8144º";
const coordinates = formatCoordinates(coordinatesString);

if (coordinates) {
  const cragObject = {
    sectors: [
      // ... your sector and route data ...
    ],
    location: {
      type: "Point",
      coordinates: coordinates,
    },
  };

  // Use the cragObject with formatted coordinates in your application
} else {
  console.log("Invalid coordinates format");
}
```

The `formatCoordinates` function extracts the latitude and longitude values from the coordinates string using a regular expression. It then parses the extracted values into numbers and returns them as an array in the format `[longitude, latitude]`.

You can replace the comment `// ... your sector and route data ...` with the relevant sector and route information for your `cragObject`. If the coordinates string is not in the expected format, the function returns `null`, and you can handle it accordingly in your application.

If you receive sun exposure data as strings formatted in different ways, you can create a function to parse and normalize the data into a consistent format. Here's an example of how you can handle different formats and convert them into a standardized format:

```javascript
function normalizeSunExposure(sunExposureString) {
  const lowerCaseString = sunExposureString.toLowerCase();

  // Check for common sun exposure keywords and map them to standardized values
  if (lowerCaseString.includes("north")) {
    return "North";
  } else if (lowerCaseString.includes("south")) {
    return "South";
  } else if (lowerCaseString.includes("east")) {
    return "East";
  } else if (lowerCaseString.includes("west")) {
    return "West";
  }

  // Add additional logic here to handle more specific cases or custom formats

  // If none of the standardized formats match, return the original string
  return sunExposureString;
}

// Example usage:
const sunExposureString = "Exposure: N";
const normalizedSunExposure = normalizeSunExposure(sunExposureString);

console.log(normalizedSunExposure); // Output: "North"
```

In the `normalizeSunExposure` function, the input `sunExposureString` is converted to lowercase for case-insensitive matching. It checks for common sun exposure keywords such as "north," "south," "east," and "west" within the string and maps them to the corresponding standardized values.

You can modify this function to handle more specific cases or custom formats based on your specific data. If none of the standardized formats match, the original string is returned as is.

By using this approach, you can normalize the different formats of sun exposure data you receive into a consistent format that can be used in your `cragObject`.
