import { createServer } from "http"
import { WebSocketServer } from "ws"
import { v4 as uuidv4 } from "uuid"
import type Connection from "./types/connection"
import type Stream from "./types/stream"
import getJoke from "./services/joke"
import Message, { MessageType } from "./types/message"

let connections: Connection[] = []
let streams: Stream[] = []

const PORT = process.env.PORT || 5000
const httpServer = createServer()
const wss = new WebSocketServer({ noServer: true })

wss.on("connection", async (conn: Connection) => {
    conn.uuid = uuidv4()

    conn.on("message", (data: Buffer) => {
        console.log(data.toString())
    })

    conn.on("close", () => {
        connections = connections.filter((c) => {
            return c.uuid !== conn.uuid
        })
        streams = streams.filter((s) => {
            return s.id !== conn.uuid
        })

        console.log(connections.length)
        connections.forEach((c) => console.log(c.uuid))

        let message: Message = {
            type: MessageType.REMOVE,
            id: conn.uuid
        }
        conn.send(JSON.stringify(message))
    })

    connections.push(conn)

    let stream: Stream = { id: conn.uuid, value: (await getJoke())! }
    streams.push(stream)

    console.log(connections.length)
    connections.forEach((c) => console.log(c.uuid))

    let message: Message = {
        type: MessageType.ADD,
        ...stream
    }
    conn.send(JSON.stringify(message))
})

httpServer.on("upgrade", (request, socket, head) => {
    if (request.headers.origin === "http://localhost:3000") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws)
        })
    } else {
        socket.write("401: Unauthorized")
        socket.destroy()
    }
})

httpServer.listen(PORT)
