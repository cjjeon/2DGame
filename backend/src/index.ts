import cors from 'cors'
import express from 'express';
import * as http from "http";

import init from './websocket'

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

init(server)