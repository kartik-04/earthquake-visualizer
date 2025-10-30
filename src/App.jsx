import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import MapView from "./components/MapView";


export default function App() {
    // central filter state
    const [filters, setFilters] = useState({
        minMag: 0,
        maxMag: 10,
        location: ""
    });

    // global dark mode state
    const [darkMode, setDarkMode] = useState(true);

    // Sync dark mode to the <html> or <body> class so Tailwind 'dark:' utilities work.
    useEffect(() => {
        const root = document.documentElement; // html element
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

            {/* Map should occupy the remaining space */}
            <div className="flex-1 min-h-0">
                <MapView filters={filters} darkMode={darkMode} />
            </div>
        </div>
    );
}