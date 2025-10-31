import React, { useState } from "react";

export default function Navbar({ filters, onFilterChange }) {
    const [localFilters, setLocalFilters] = useState(filters);

    // 🔸 Local input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters({ ...localFilters, [name]: value });
    };

    // 🔸 Applies filters to parent state
    const handleApply = () => {
        onFilterChange({
            minMag: parseFloat(localFilters.minMag) || 0,
            maxMag: parseFloat(localFilters.maxMag) || 10,
            location: localFilters.location || "",
        });
    };

    return (
        <nav className="relative flex justify-between items-center px-6 py-3 shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 z-[1000]">
            <div className="text-2xl font-bold tracking-tight">
                🌍 Earthquake <span className="text-indigo-500">Visualizer</span>
            </div>

            {/* 🔹 Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Min/Max Magnitude */}
                <input
                    type="number"
                    name="minMag"
                    value={localFilters.minMag}
                    onChange={handleChange}
                    placeholder="Min Mag"
                    className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                <input
                    type="number"
                    name="maxMag"
                    value={localFilters.maxMag}
                    onChange={handleChange}
                    placeholder="Max Mag"
                    className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
                <input
                    type="text"
                    name="location"
                    value={localFilters.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />

                {/* Apply button */}
                <button
                    onClick={handleApply}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md"
                >
                    Apply
                </button>
            </div>
        </nav>
    );
}