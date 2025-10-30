// 🧮 Filters earthquake features by magnitude and/or location
export function filterEarthquakes(earthquakes, { magnitudeFilter, locationFilter }) {
    return earthquakes.filter((feature) => {
        const { mag, place } = feature.properties;

        // Magnitude range filter
        const magnitudePass =
            !magnitudeFilter ||
            (mag !== null && mag >= magnitudeFilter.min && mag <= magnitudeFilter.max);

        // Location substring filter
        const locationPass =
            !locationFilter ||
            (place && place.toLowerCase().includes(locationFilter.toLowerCase()));

        return magnitudePass && locationPass;
    });
}