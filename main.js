const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const io = require('socket.io-client');

let mainWindow;
let socket;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');

    // Підключення до сервера через Socket.io
    socket = io('http://AbraelChannel.github.io');
    
    socket.on('ping-location', (data) => {
        mainWindow.webContents.send('ping-location', data);
    });
    
    mainWindow.webContents.once('did-finish-load', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

// Обробка подій
ipcMain.on('ping-map', (event, data) => {
    socket.emit('ping-location', data);
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
