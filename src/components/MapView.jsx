import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useEarthquakeData from "../hooks/useEarthquakeData";

// Fix default marker icons (important for Vite + Leaflet)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView() {
    // Fetch data from the hook (can add filters later)
    const { data, loading, error } = useEarthquakeData({
        magnitudeFilter: { min: 0, max: 10 },
        locationFilter: "",
        refreshInterval: 15000,
    });

    if (typeof window === "undefined") {
        return (
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
                <p>Loading map...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 h-[calc(100vh-56px)] w-full">
            <MapContainer
                center={[0, 0]}
                zoom={2}
                minZoom={2}
                maxBounds={[[-90, -180], [90, 180]]}
                maxBoundsViscosity={1.0}
                className="h-full w-full"
                zoomControl={true}
            >
                {/* OpenStreetMap Tile Layer */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    maxZoom={20}
                    wrapTiles={false}
                />

                {/* Loading or Error States */}
                {loading && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-4 py-2 rounded text-gray-800 text-sm">
                        Fetching latest earthquakes...
                    </div>
                )}

                {error && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white shadow-md px-4 py-2 rounded text-sm">
                        Error: {error}
                    </div>
                )}

                {/* Render Earthquake Markers */}
                {data.map((quake) => {
                    const [lon, lat, depth] = quake.geometry.coordinates;
                    const { mag, place, time } = quake.properties;
                    return (
                        <Marker key={quake.id} position={[lat, lon]}>
                            <Popup>
                                <div className="text-sm">
                                    <p className="font-semibold">{place || "Unknown location"}</p>
                                    <p>Magnitude: {mag ?? "N/A"}</p>
                                    <p>Depth: {depth} km</p>
                                    <p>
                                        Time:{" "}
                                        {new Date(time).toLocaleString("en-US", {
                                            hour12: true,
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}