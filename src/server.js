const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors({ origin: 'http://127.0.0.1:3000' }));

app.use(express.json());
app.post('/github-webhook', (req, res) => {
    const event = req.body;

    io.emit('githubEvent', event);
    res.status(200).send('Event received');
});

app.post('/rollbar-webhook', (req, res) => {
    const event = req.body;

    io.emit('rollbarEvent', event);
    res.status(200).send('Event received');
});

app.post('/jira-webhook', (req, res) => {
    const event = req.body;

    io.emit('jiraEvent', event);
    res.status(200).send('Event received');
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));