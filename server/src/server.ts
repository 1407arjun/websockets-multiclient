import { createServer } from "http"
import { WebSocket, WebSocketServer } from "ws"
import { v4 as uuidv4 } from "uuid"

type Connection = WebSocket & {
    uuid: string
}

let connections: Connection[] = []

const PORT = process.env.PORT || 5000
const httpServer = createServer()
const wss = new WebSocketServer({ noServer: true })

wss.on("connection", (conn: Connection) => {
    conn.uuid = uuidv4()

    conn.on("message", (data: Buffer) => {
        console.log(data.toString())
    })

    conn.on("close", () => {
        connections = connections.filter((c) => {
            return c.uuid !== conn.uuid
        })
        console.log(connections.length)
        connections.forEach((c) => console.log(c.uuid))
    })

    connections.push(conn)
    console.log(connections.length)
    connections.forEach((c) => console.log(c.uuid))
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
