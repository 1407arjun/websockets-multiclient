/// <reference path="../global.d.ts" />

import { createServer } from "http"
import { WebSocketServer } from "ws"
import interval from "./services/interval"
import onUpgrade from "./services/onUpgrade"
import onConnection from "./services/onConnection"

global.connections = []
global.streams = []

const PORT = process.env.PORT || 5000
const httpServer = createServer()

global.wss = new WebSocketServer({ noServer: true })
wss.on("connection", onConnection)

httpServer.on("upgrade", onUpgrade)
httpServer.listen(PORT, interval)
