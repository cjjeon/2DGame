import bodyParser from "body-parser";
import cors from 'cors'
import express from 'express';
import * as http from "http";
import 'reflect-metadata'
import config from "./config";
import createUserWithoutSignup from "./router/create-user-without-signup";

import init from './websocket'

const app = express();
app.use(cors())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Timezones by location application is running on port ${config.PORT}.`);
});

app.get('/', (req, res) => {
    res.send("A")
})

app.post('/create-user-without-signup', createUserWithoutSignup)

init(server)