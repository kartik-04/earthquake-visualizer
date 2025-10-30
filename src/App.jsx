import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";

export default function App() {
    // central filter state
    const [filters, setFilters] = useState({
        minMag: 0,
        maxMag: 10,
        location: "",
    });

    // global dark mode state
    const [darkMode, setDarkMode] = useState(true);

    // Tailwind dark mode sync
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [darkMode]);

    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900">
            <Navbar
                filters={filters}
                onFilterChange={setFilters}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            {/* Map fills remaining space */}
            <div className="flex-1 min-h-0">
                <MapView filters={filters} darkMode={darkMode} />
            </div>
        </div>
    );
}