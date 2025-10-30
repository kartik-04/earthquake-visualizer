// Returns earthquakes filtered by magnitude range or location string
export function filterEarthquakes(earthquakes, { magnitudeFilter, locationFilter }) {
    return earthquakes.filter((feature) => {
        const { mag, place } = feature.properties;

        const magnitudePass =
            !magnitudeFilter ||
            (mag !== null && mag >= magnitudeFilter.min && mag <= magnitudeFilter.max);

        const locationPass =
            !locationFilter ||
            (place && place.toLowerCase().includes(locationFilter.toLowerCase()));

        return magnitudePass && locationPass;
    });
}