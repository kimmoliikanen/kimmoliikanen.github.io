document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map-widget");
    if (!mapContainer) {
        console.error("Virhe: Kartan HTML-elementtiä ei löytynyt!");
        return;
    }

    const map = L.map(mapContainer).setView([60.1699, 24.9384], 12); // Helsingin keskipiste
    
    // OpenStreetMap-taustakartta
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Lisää reittimerkkejä
    const reitit = [
        { nimi: "Lauttasaaren ulkoilureitti", lat: 60.1575, lng: 24.8827 },
        { nimi: "Seurasaaren lenkki", lat: 60.1795, lng: 24.8837 },
        { nimi: "Keskuspuiston polut", lat: 60.2055, lng: 24.9278 }
    ];

    reitit.forEach(reitti => {
        L.marker([reitti.lat, reitti.lng])
            .addTo(map)
            .bindPopup(`<b>${reitti.nimi}</b><br>Hyvä ulkoilureitti.`);
    });
});