import React, { useState } from "react";

export default function FilterBar({ onFilterChange }) {
    // 🧮 Local filter state
    const [minMag, setMinMag] = useState(0);
    const [maxMag, setMaxMag] = useState(10);
    const [location, setLocation] = useState("");

    // 🔘 Apply filters and pass to parent
    const handleApply = () => {
        onFilterChange({
            magnitudeFilter: { min: parseFloat(minMag), max: parseFloat(maxMag) },
            locationFilter: location.trim(),
        });
    };

    return (
        <div className="bg-gray-100 p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>

            {/* 🔹 Magnitude range inputs */}
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Min Magnitude</label>
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={minMag}
                    onChange={(e) => setMinMag(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Max Magnitude</label>
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={maxMag}
                    onChange={(e) => setMaxMag(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                />
            </div>

            {/* 🔹 Location input */}
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Location</label>
                <input
                    type="text"
                    placeholder="e.g. California"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                />
            </div>

            {/* 🔘 Apply button */}
            <button
                onClick={handleApply}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
                Apply Filters
            </button>
        </div>
    );
}