import cors from 'cors'
import express from 'express';
import * as http from "http";
import SocketIO from 'socket.io';

const app = express();
app.use(cors())

const server = http.createServer(app)
const port = 4001;


server.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

app.get('/', (req, res) => {
    res.send("A")
})

const wsServer = new SocketIO.Server(server, {
    cors: {
        origin: '*',
    }
})
wsServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (message) => {
        console.log(message)
        socket.send("hello world!")
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})