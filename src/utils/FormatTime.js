// 🕓 Converts an earthquake timestamp into a readable format (e.g. "Oct 30, 2025, 05:45 AM")
export default function formatTime(timestamp) {
    if (!timestamp) return "Unknown";
    try {
        return new Date(timestamp).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    } catch {
        return "Invalid Date";
    }
}