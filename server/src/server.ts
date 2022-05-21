import { WebSocketServer } from "ws"

interface connection {
    uuid: string
    conn: unknown
}

let connections: connection[] = []

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws) => {
    ws.on("message", (data: string) => {
        console.log("received: %s", data)
    })

    ws.send("something")
})
