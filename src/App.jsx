import React from "react";
import MapView from "./components/MapView";
import FilterBar from "./components/FilterBar";

export default function App() {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white text-center py-3 text-xl font-semibold">
                🌍 Earthquake Visualizer
            </header>

            {/* Main content: sidebar + map */}
            <main className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block w-1/4 bg-gray-100 border-r">
                    <FilterBar />
                </aside>
                <section className="flex-1">
                    <MapView />
                </section>
            </main>
        </div>
    );
}