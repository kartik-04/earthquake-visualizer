import React, { useState } from "react";

export default function Navbar({ filters, onFilterChange }) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [darkMode] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Use parseFloat for numerical inputs to ensure correct data type if needed later
        setLocalFilters({ ...localFilters, [name]: value === "" ? "" : parseFloat(value) });
    };

    const handleApply = () => {
        // Pass the updated filters to the parent component
        onFilterChange(localFilters);
    };

    // Define common classes for cleaner template
    const primaryColor = "text-indigo-500 hover:text-indigo-400"; // Modern accent color
    const buttonBase = "px-4 py-2 font-semibold rounded-lg transition-all duration-200 ease-in-out";
    const inputBase = "px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const darkInput = "bg-gray-700 border-gray-600 text-white placeholder-gray-400";
    const lightInput = "bg-white border-gray-300 text-gray-900 placeholder-gray-500";


    return (
        <nav
            className="flex justify-between items-center max-container"
        >
            {/* Logo / Title - Increased size and modern font tracking */}
            <div className="text-3xl font-extrabold tracking-tight">
                <span className={primaryColor}>🌍</span> Earthquake Visualizer
            </div>

            {/* Filter Inputs - Added gap and improved alignment */}
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    name="minMag"
                    value={localFilters.minMag}
                    onChange={handleChange}
                    placeholder="Min Mag"
                    min="0"
                    max="10"
                    step="0.1"
                    className={`${inputBase} w-32 ${darkMode ? darkInput : lightInput}`}
                />
                <input
                    type="number"
                    name="maxMag"
                    value={localFilters.maxMag}
                    onChange={handleChange}
                    placeholder="Max Mag"
                    min="0"
                    max="10"
                    step="0.1"
                    className={`${inputBase} w-32 ${darkMode ? darkInput : lightInput}`}
                />

                <button
                    onClick={handleApply}
                    // Modern button style: Indigo background, slight lift on hover
                    className={`${buttonBase} bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg`}
                >
                    Apply Filter
                </button>
            </div>

            {/* Dark Mode Toggle - Cleaner, more prominent button */}
        </nav>
    );
}