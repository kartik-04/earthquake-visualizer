import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";

export default function App() {
    // 🔹 Central filter state for controlling map data
    const [filters, setFilters] = useState({
        minMag: 0,
        maxMag: 10,
        location: "",
    });

    // 🔹 Global dark mode toggle
    const [darkMode, setDarkMode] = useState(true);

    // 🌓 Sync Tailwind's "dark" class with React state
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [darkMode]);

    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900 pt-[64px]">
            {/* Navbar: controls filters and theme */}
            <Navbar
                filters={filters}
                onFilterChange={setFilters}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            {/* MapView takes up the remaining space */}
            <div className="flex-1 min-h-0">
                <MapView filters={filters} darkMode={darkMode} />
            </div>
        </div>
    );
}