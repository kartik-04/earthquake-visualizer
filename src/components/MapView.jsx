import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useEarthquakeData from "../hooks/useEarthquakeData";

// 🧩 Set default Leaflet marker icons (fix missing images)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView({ filters }) {
    // 🧭 Fetch filtered earthquake data
    const { data, loading, error } = useEarthquakeData({
        magnitudeFilter: { min: filters.minMag, max: filters.maxMag },
        locationFilter: filters.location,
    });

    return (
        <div className="flex-1 h-[calc(100vh-56px)] w-full">
            {/* 🌍 Main Leaflet map */}
            <MapContainer
                center={[0, 0]}
                zoom={2}
                className="h-full w-full"
                zoomControl={true}
                maxBounds={[[-90, -180], [90, 180]]}
            >
                {/* 🗺️ OpenStreetMap tiles */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* 🌀 Loading indicator */}
                {loading && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded shadow">
                        Loading earthquakes...
                    </div>
                )}

                {/* ❌ Error message */}
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow">
                        Error: {error}
                    </div>
                )}

                {/* 📍 Render markers for each earthquake */}
                {data.map((quake) => {
                    if (!quake.geometry?.coordinates) return null;
                    const [lon, lat, depth] = quake.geometry.coordinates;
                    const { mag, place, time } = quake.properties;
                    if (lat == null || lon == null) return null; // skip invalid points

                    return (
                        <Marker key={quake.id} position={[lat, lon]}>
                            <Popup>
                                <div>
                                    <p className="font-semibold">{place || "Unknown"}</p>
                                    <p>Magnitude: {mag ?? "N/A"}</p>
                                    <p>Depth: {depth} km</p>
                                    <p>
                                        Time:{" "}
                                        {new Date(time).toLocaleString("en-US", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
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