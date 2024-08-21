const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

let markers = [];  // Просте зберігання міток у пам'яті, можна замінити на базу даних

app.get('/markers', (req, res) => {
    res.json(markers);
});

app.post('/markers', (req, res) => {
    const marker = req.body;
    markers.push(marker);
    res.json(marker);
});

io.on('connection', (socket) => {
    socket.on('ping-location', (data) => {
        io.emit('ping-location', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
