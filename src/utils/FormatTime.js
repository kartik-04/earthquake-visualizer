/**
 * 🕓 Formats a Unix timestamp into a human-readable date and time string
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string (e.g., "Oct 30, 2025, 05:45 AM")
 * @example
 * // returns "Oct 31, 2025, 09:15 PM"
 * formatTime(1730393100000);
 */
export default function formatTime(timestamp) {
    // Return early if no timestamp is provided
    if (!timestamp) return "Unknown";
    
    try {
        // Convert timestamp to a localized date string with specific formatting options
        return new Date(timestamp).toLocaleString("en-US", {
            day: "2-digit",    // 2-digit day (01-31)
            month: "short",    // Short month name (Jan, Feb, etc.)
            year: "numeric",   // Full year (e.g., 2025)
            hour: "2-digit",   // 12-hour format, 2 digits
            minute: "2-digit", // Minutes, 2 digits
            hour12: true,      // Use 12-hour clock (AM/PM)
        });
    } catch (error) {
        // Handle any date parsing errors gracefully
        console.error("Error formatting timestamp:", error);
        return "Invalid Date";
    }
}