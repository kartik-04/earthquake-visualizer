import React from "react";
import formatTime from "../utils/formatTime";

export default function MarkerPopup({ quake }) {
    // Extract earthquake info
    const [, , depth] = quake.geometry.coordinates; // ignore lon/lat here
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