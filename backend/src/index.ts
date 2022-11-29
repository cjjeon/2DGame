import express from 'express';
import * as http from "http";
import Websocket from 'ws';

const app = express();
const server = http.createServer(app)
const port = 3000;

app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});

const wsServer = new Websocket.Server({server})
wsServer.on('connection', (ws) => {

    ws.on('message', (message: string) => {
        console.log('received: ', message);
        ws.send(`Hi!`)
    })
})