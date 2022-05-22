import type Connection from "./src/types/connection"
import type Stream from "../client/src/types/stream"
import { WebSocketServer } from "ws"

declare global {
    var connections: Connection[]
    var streams: Stream[]
    var wss: WebSocketServer
}

export {}
