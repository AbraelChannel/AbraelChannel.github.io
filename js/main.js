const map = L.map('map').setView([51.505, -0.09], 13);

// Завантаження міток з API сервера
fetch('https://your-api-url/markers')
    .then(response => response.json())
    .then(markers => {
        markers.forEach(marker => {
            addMarkerToMap(marker);
        });
    });

function addMarkerToMap(marker) {
    L.marker([marker.lat, marker.lng]).addTo(map)
        .bindPopup(`<b>${marker.title}</b><br>${marker.description}`);
}

// Логіка для пінгування карти
map.on('click', function(e) {
    if (e.originalEvent.ctrlKey) {
        const color = '#ff0000';  // Задайте колір або отримайте з налаштувань
        window.pingMapLocation(e.latlng.lat, e.latlng.lng, color);
    }
});

function showPing(data) {
    const circle = L.circle([data.lat, data.lng], {
        color: data.color,
        fillColor: data.color,
        fillOpacity: 0.5,
        radius: 50
    }).addTo(map);

    setTimeout(() => {
        map.removeLayer(circle);
    }, 1000);
}

// Активувати адмін-панель після введення коду
document.addEventListener('keydown', function(event) {
    if (event.key === 'F12') {  // Замість F12 використовуйте свій код
        document.getElementById('admin-panel').style.display = 'block';
    }
});

document.getElementById('marker-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const markerData = { lat, lng, title, description };

    fetch('https://your-api-url/markers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(markerData)
    })
    .then(response => response.json())
    .then(marker => {
        addMarkerToMap(marker);
    });

    this.reset();
});
