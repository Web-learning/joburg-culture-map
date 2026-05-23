const map = L.map('map', {
    center: [-26.1860, 28.0395],
    zoom: 14
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const venueLayer = L.layerGroup().addTo(map);
const diningLayer = L.layerGroup().addTo(map);

const venueIcon = L.divIcon({
    html: `<div style="background-color: #9b59b6; width: 36px; height: 36px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"><svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>`,
    className: 'custom-map-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

const diningIcon = L.divIcon({
    html: `<div style="background-color: #e67e22; width: 36px; height: 36px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"><svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg></div>`,
    className: 'custom-map-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

const locations = [
    { name: "Constitution Hill", lat: -26.1887, lng: 28.0436, type: "venue", layer: venueLayer, icon: venueIcon, image: "https://wikimedia.org", details: "<b>Hours:</b> 09:00 - 17:00<br><b>Transit:</b> Rea Vaya BRT<br><b>Nearby Food:</b> 86 Public" },
    { name: "Wits Linder Auditorium", lat: -26.178144, lng: 28.042152, type: "venue", layer: venueLayer, icon: venueIcon, image: "https://wikimedia.org", details: "<b>Hours:</b> Event Dependent<br><b>Transit:</b> Gautrain Bus J1<br><b>Nearby Food:</b> Mike's House" },
    { name: "Chris Seabrooke Music Hall", lat: -26.19530, lng: 28.03214, type: "venue", layer: venueLayer, icon: venueIcon, image: "https://wikimedia.org", details: "<b>Hours:</b> Event Dependent<br><b>Transit:</b> Near Park Station<br><b>Nearby Food:</b> The Playground" },
    { name: "Mike's Heritage House", lat: -26.1785, lng: 28.0435, type: "dining", layer: diningLayer, icon: diningIcon, image: "https://wikimedia.org", details: "<b>Vibe:</b> Upscale steakhouse.<br><b>Ideal for:</b> Linder Auditorium crowds." },
    { name: "86 Public Braamfontein", lat: -26.1912, lng: 28.0390, type: "dining", layer: diningLayer, icon: diningIcon, image: "https://wikimedia.org", details: "<b>Vibe:</b> Trendy wood-fired pizza.<br><b>Ideal for:</b> Constitution Hill visitors." },
    { name: "The Playground", lat: -26.1945, lng: 28.0361, type: "dining", layer: diningLayer, icon: diningIcon, image: "https://wikimedia.org", details: "<b>Vibe:</b> Artisan weekend market.<br><b>Ideal for:</b> Weekend event snacks." }
];

locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: loc.icon });
    const tagClass = loc.type === "venue" ? "venue-tag" : "food-tag";
    const tagText = loc.type === "venue" ? "Culture Venue" : "Pre-Concert Dining";

    const popupContent = `
        <div class="leaflet-popup-content-value" style="width: 220px;">
            <img src="${loc.image}" alt="${loc.name}" style="width:100%; height:120px; object-fit:cover; border-radius:4px; margin-bottom:8px;">
            <span class="tag ${tagClass}">${tagText}</span>
            <h3 style="font-size:15px; margin: 4px 0;">${loc.name}</h3>
            <p style="font-size:12px; color:#555; margin:0;">${loc.details}</p>
        </div>
    `;
    
    marker.bindPopup(popupContent, { maxWidth: 250 }).addTo(loc.layer);
});

const overlayMaps = {
    "<span style='color: #9b59b6; font-weight: bold;'>🎵 Culture Venues</span>": venueLayer,
    "<span style='color: #e67e22; font-weight: bold;'>🍴 Restaurants</span>": diningLayer
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
