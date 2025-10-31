/**
 * 🧮 Filters an array of earthquake features based on magnitude and location criteria
 * 
 * @param {Array} earthquakes - Array of GeoJSON features containing earthquake data
 * @param {Object} filters - Filter criteria object
 * @param {Object} [filters.magnitudeFilter] - Optional magnitude range filter
 * @param {number} filters.magnitudeFilter.min - Minimum magnitude (inclusive)
 * @param {number} filters.magnitudeFilter.max - Maximum magnitude (inclusive)
 * @param {string} [filters.locationFilter] - Optional location name filter (case-insensitive substring match)
 * @returns {Array} Filtered array of earthquake features that match all criteria
 * 
 * @example
 * // Returns earthquakes with magnitude between 4.0 and 6.0 in California
 * filterEarthquakes(earthquakes, {
 *   magnitudeFilter: { min: 4.0, max: 6.0 },
 *   locationFilter: 'California'
 * });
 */
export function filterEarthquakes(earthquakes, { magnitudeFilter, locationFilter }) {
    return earthquakes.filter((feature) => {
        // Extract magnitude and location from feature properties
        const { mag, place } = feature.properties;

        // Check if the earthquake passes the magnitude filter
        // If no magnitude filter is provided, this check passes by default
        const magnitudePass =
            !magnitudeFilter ||
            (mag !== null && 
             mag >= magnitudeFilter.min && 
             mag <= magnitudeFilter.max);

        // Check if the earthquake passes the location filter
        // If no location filter is provided, this check passes by default
        const locationPass =
            !locationFilter ||
            (place && place.toLowerCase().includes(locationFilter.toLowerCase()));

        // Only include features that pass both filters
        return magnitudePass && locationPass;
    });
}