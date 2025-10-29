import {useEffect, useState, useRef, useCallback} from "react";

const API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

/**
 * Custom hook to fetch and auto-refresh earthquake data.
 * Handles errors, loading, and optional filters.
 */
export default function useEarthquakeData({ magnitudeFilter, locationFilter, refreshInterval = 15000 } = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    // Helper: filter earthquakes based on magnitude and location
    const applyFilters = (features) => {
        return features.filter((feature) => {
            const { mag, place } = feature.properties;

            const magnitudePass =
                !magnitudeFilter ||
                (mag !== null && mag >= magnitudeFilter.min && mag <= magnitudeFilter.max);

            const locationPass =
                !locationFilter ||
                (place && place.toLowerCase().includes(locationFilter.toLowerCase()));

            return magnitudePass && locationPass;
        });
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Failed to fetch data from USGS API");

            const json = await response.json();
            const features = json.features || [];
            const filtered = applyFilters(features);

            setData(filtered);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);

            // Recursive auto-refresh
            timeoutRef.current = setTimeout(fetchData, refreshInterval);
        }
    });

    useEffect(() => {
        fetchData(); // Initial fetch

        // Cleanup on unmounted or filter change
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [magnitudeFilter, locationFilter, fetchData]);

    return { data, loading, error, refetch: fetchData };
}