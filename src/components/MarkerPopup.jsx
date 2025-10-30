import React from "react";
import formatTime from "../utils/formatTime";

export default function MarkerPopup({ quake }) {
    // Skip unused lon/lat to avoid ESLint `no-unused-vars` warnings
    const [, , depth] = quake.geometry.coordinates;
    const { mag, place, time } = quake.properties;

    return (
        <div className="text-sm">
            <p className="font-semibold">{place || "Unknown location"}</p>
            <p>Magnitude: {mag ?? "N/A"}</p>
            <p>Depth: {depth} km</p>
            <p>Time: {formatTime(time)}</p>
        </div>
    );
}