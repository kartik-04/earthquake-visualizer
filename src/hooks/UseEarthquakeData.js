import { useEffect, useState, useCallback } from "react";

const API_URL =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function useEarthquakeData({ magnitudeFilter, locationFilter }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            const json = await response.json();

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

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
}