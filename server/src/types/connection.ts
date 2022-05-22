import { WebSocket } from "ws"

type Connection = WebSocket & {
    uuid: string
    streams: string[]
}

export default Connection
