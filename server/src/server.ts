import { createServer } from "http"
import { WebSocketServer } from "ws"

interface connection {
    uuid: string
    conn: unknown
}

let connections: connection[] = []

const PORT = process.env.PORT || 5000
const httpServer = createServer()
const wss = new WebSocketServer({ noServer: true })

wss.on("connection", (conn) => {
    conn.on("message", (data: Buffer) => {
        console.log(data.toString())
    })

    conn.send("something")
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
