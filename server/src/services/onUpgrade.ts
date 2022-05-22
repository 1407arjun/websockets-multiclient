import { IncomingMessage } from "http"
import internal from "stream"

export default (
    request: IncomingMessage,
    socket: internal.Duplex,
    head: Buffer
) => {
    if (request.headers.origin === "http://localhost:3000") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws)
        })
    } else {
        socket.write("401: Unauthorized")
        socket.destroy()
    }
}
