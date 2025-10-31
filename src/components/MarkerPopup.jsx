import React from "react";
import formatTime from "../utils/formatTime";

/**
 * MarkerPopup - Displays earthquake details in a popup
 * @param {Object} quake - Earthquake GeoJSON feature
 * @param {Object} quake.geometry - Earthquake coordinates
 * @param {number[]} quake.geometry.coordinates - [longitude, latitude, depth]
 * @param {Object} quake.properties - Earthquake metadata
 */
export default function MarkerPopup({ quake }) {
    // Extract coordinates (lon, lat, depth), ignoring lon/lat as they're handled by the map
    const [, , depth] = quake.geometry.coordinates;
    const { mag, place, time } = quake.properties;

    return (
        <div className="text-sm">
            <p className="font-semibold">{place || "Unknown location"}</p>
            <p>Magnitude: {mag?.toFixed(1) || "N/A"}</p>
            <p>Depth: {Math.round(depth)} km</p>
            <p>Time: {formatTime(time)}</p>
        </div>
    );
}