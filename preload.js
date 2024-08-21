window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');

    ipcRenderer.on('ping-location', (event, data) => {
        showPing(data);
    });

    window.pingMapLocation = (lat, lng, color) => {
        ipcRenderer.send('ping-map', { lat, lng, color });
    };
});
