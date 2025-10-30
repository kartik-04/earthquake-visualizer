import { useEffect, useState, useCallback } from "react";

// 🌐 USGS live earthquake API (returns GeoJSON)
const API_URL =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// 🎣 Custom React hook for fetching and filtering earthquake data
export default function useEarthquakeData({ magnitudeFilter, locationFilter }) {
    const [data, setData] = useState([]);      // Fetched and filtered earthquakes
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);     // Error state

    // ⚙️ Fetch + filter logic, memoized with useCallback
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            const json = await response.json();

            // Apply filters (client-side)
            const filtered = (json.features || []).filter((f) => {
                const { mag, place } = f.properties;

                const magPass =
                    !magnitudeFilter ||
                    (mag >= magnitudeFilter.min && mag <= magnitudeFilter.max);

                const locPass =
                    !locationFilter ||
                    (place && place.toLowerCase().includes(locationFilter.toLowerCase()));

                return magPass && locPass;
            });

            setData(filtered);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [magnitudeFilter, locationFilter]);

    // 🚀 Fetch on mount and whenever filters change
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
}