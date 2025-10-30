// src/hooks/useEarthquakeData.js
import { useEffect, useState, useRef, useCallback } from "react";

const API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function useEarthquakeData({ magnitudeFilter, locationFilter, refreshInterval = 15000 } = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);

    const applyFilters = useCallback((features) => {
        return features.filter((feature) => {
            const { mag, place } = feature.properties;

            const magnitudePass =
                !magnitudeFilter ||
                (mag !== null &&
                    mag >= Number(magnitudeFilter.min || 0) &&
                    mag <= Number(magnitudeFilter.max || 10));

            const locationPass =
                !locationFilter ||
                (place && place.toLowerCase().includes(locationFilter.toLowerCase()));

            return magnitudePass && locationPass;
        });
    }, [magnitudeFilter, locationFilter]);

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
            console.error("⚠️ Fetch error:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
            timeoutRef.current = setTimeout(fetchData, refreshInterval);
        }
    }, [applyFilters, refreshInterval]);

    useEffect(() => {
        fetchData();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [fetchData]);

    return { data, loading, error };
}