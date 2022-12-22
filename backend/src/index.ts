import bodyParser from "body-parser";
import cookies from 'cookie-parser'
import cors from 'cors'
import express from 'express';
import * as http from "http";
import 'reflect-metadata'
import config from "./config";
import router from "./router";

import init from './websocket'

const app = express();
app.use(cors({
    allowedHeaders: ['Access-Control-Allow-Credentials', 'Content-Type'],
    credentials: true,
    origin: ['http://localhost:4000']
}))
app.use(cookies())
app.use(bodyParser.json())
app.use(router)

const server = http.createServer(app)
server.listen(config.PORT, () => {
    console.log(`Timezones by location application is running on port ${config.PORT}.`);
});

init(server)