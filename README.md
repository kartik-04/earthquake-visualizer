# 🌍 Earthquake Visualizer

**Earthquake Visualizer** is an interactive web application that displays real-time earthquake data on an interactive map using the **USGS Earthquake API**.  
It helps users explore and understand global seismic activity through a clean and intuitive interface.

![App Screenshot](./screenshots/main-preview.png)  
*(Preview of Earthquake Visualizer in action)*

## Requirement
![Screenshot 2025-10-31 at 9.23.26 PM.png](src/assets/Screenshot%202025-10-31%20at%209.23.26%E2%80%AFPM.png)

## 🚀 Features

- **Real-time Earthquake Data:** Fetches live earthquake information from the USGS GeoJSON feed.
- **Interactive Map:** Built using **Leaflet.js**, allowing zoom, pan, and marker interactions.
- **Filter System:** Filter earthquakes by **magnitude** and **time range**.
- **Responsive UI:** Fully responsive layout optimized for both desktop and mobile.
- **Dynamic Popups:** Clickable markers showing detailed earthquake information such as magnitude, location, and time.
- **Optimized Performance:** Lightweight React setup powered by **Vite** for fast loading and builds.

---

## 🧠 Tech Stack

| Category | Technologies Used |
|-----------|------------------|
| **Frontend** | React 18, Vite |
| **Styling** | Tailwind CSS |
| **Map Rendering** | Leaflet.js, React-Leaflet |
| **Data Source** | USGS Earthquake API |
| **State Management** | React Hooks (useState, useEffect) |
| **Deployment** | Netlify |

---

## 🏗️ Project Architecture

```text
src/
 ├── components/
 │     ├── MapView.jsx          # Main map component using React Leaflet
 │     ├── FilterPanel.jsx      # UI for filtering earthquakes
 │
 ├── hooks/
 │     └── useEarthquakeData.js # Custom hook for fetching & managing earthquake data
 │
 ├── assets/
 │     └── icons/               # (Optional) custom icons or images
 │
 ├── App.jsx                    # Root component
 ├── main.jsx                   # React entry point
 └── index.css                  # Tailwind CSS setup

```


⚙️ Installation & Setup

Follow these steps to run the project locally:

# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/earthquake-visualizer.git

# 2️⃣ Move into the project directory
cd earthquake-visualizer

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev


Then open your browser and visit:
👉 http://localhost:5173


🌐 **Live Demo**

The app is live at:
🔗 https://earthquake-visualizer.netlify.app￼

⸻

📡 Data Source — USGS Earthquake API

The project uses the USGS Earthquake Hazards Program API￼.
Example endpoint used:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson


Each record contains:
•	properties.mag → Magnitude
•	properties.place → Location description
•	properties.time → Timestamp
•	geometry.coordinates → [longitude, latitude, depth]

⸻

🧩 Filters
•	By Magnitude: Allows selecting a minimum and maximum magnitude.
•	By Time Range: Fetch earthquakes from “past hour”, “past day”, “past 7 days”, etc.
•	The filters dynamically update the displayed markers on the map.

⸻

📱 Responsiveness
•	The app is responsive for mobile, tablet, and desktop.
•	The map resizes dynamically.
•	The filter panel remains visible or collapses depending on screen size.

🧠 Note: In deployed mode, ensure the filter container has a fixed z-index above the map to prevent it from disappearing during zoom or drag actions.

⸻

💡 Future Improvements
•	Add heatmap visualization for intensity distribution.
•	Integrate historical earthquake trend charts using Recharts or D3.js.
•	Enable region-based filtering and search by country.
•	Add “dark mode” map theme toggle.
•	Show seismic depth visualization by marker color scale.

⸻

🧑‍💻 Author

Kartik Singh
Aspiring Software Engineer | Backend & Full-Stack Developer
🔗 LinkedIn￼
📧 Email￼

⸻

🪪 License

This project is open-source under the MIT License￼.

⸻
⭐ Acknowledgements
•	USGS Earthquake Hazards Program￼
•	Leaflet.js￼
•	React-Leaflet￼
•	Tailwind CSS￼
•	Vite￼

⸻

🏁 TL;DR Summary

A React + Leaflet-based web app to visualize global earthquake data fetched live from USGS.
Built for performance, clarity, and real-time data insight — deployed seamlessly on Netlify.